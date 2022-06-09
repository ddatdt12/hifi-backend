const Admin = require('../models/Admin');
const Company = require('../models/Company');
const Room = require('../models/Room');
const User = require('../models/User');

module.exports = (io) => {
	io.on('connection', (socket) => {
		///Handle khi có connect từ client tới
		console.log('New client connect message ' + socket.id);

		socket.on('joinRoom', (data) => {
			joinRoom(socket, data);
		});

		socket.on('joinRoomByChatterId', (data) => {
			joinRoomByChatterId(socket, data);
		});

		socket.on('fetchRoom', (data) => {
			fetchRoom(socket, data);
		});

		socket.on('sendDataClient', (data) => {
			sendDataClient(data, io);
		});

		socket.on('disconnect', () => {
			disconnect();
		});
	});
};

const sendDataClient = (data, io) => {
	Room.findOneAndUpdate(
		{ _id: data.room },
		{ $push: { messages: data.message } },
		{ new: true }
	)
		.lean()
		.then((res) => {
			// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
			io.in(data.room).emit('sendDataServer', res);
		})
		.catch((error) => {
			console.log(error);
		});
};

const joinRoom = async (socket, data) => {
	var room = await Room.findOneAndUpdate(
		{ _id: data },
		{},
		{ upsert: true }
	).lean();

	let newChatters = [];

	newChatters = room.chatters.map(async (chatter) => {
		if (chatter.type === 'company') {
			var company = await Company.findById(chatter.chatterId).lean();
			chatter.chatterId = company._id;
			chatter.name = company.name;
			chatter.avatar = company.logo;
			chatter.type = 'company';
		}

		if (chatter.type === 'user') {
			var user = await User.findById(chatter.chatterId).lean();
			chatter.avatar = user.photoUrl;
			chatter.chatterId = user._id;
			chatter.name = user.name;
			chatter.type = 'user';
		}

		return chatter;
	});

	const res = await Promise.all(newChatters);
	await Room.updateOne({ _id: data }, { $set: { chatters: res } });

	socket.join(room._id.toString());
};

const fetchRoom = (socket, data) => {
	Room.findOneAndUpdate({ _id: data }, {}, { upsert: true })
		.lean()
		.then((res) => {
			socket.emit('sendRoom', res);
		})
		.catch((err) => {
			console.log(err);
		});
};

const joinRoomByChatterId = async (socket, data) => {
	let chatters = [];

	if (data.admin) {
		var admin = await Admin.findById(data.admin).lean();
		chatters.push({
			chatterId: data.admin,
			name: admin.name,
			avatar: '',
			type: 'admin',
		});
	}

	if (data.company) {
		var company = await Company.findById(data.company).lean();
		chatters.push({
			chatterId: data.company,
			name: company.name,
			avatar: company.logo,
			type: 'company',
		});
	}

	if (data.user) {
		var user = await User.findById(data.user).lean();
		chatters.push({
			chatterId: data.user,
			name: user.name,
			avatar: user.photoUrl,
			type: 'user',
		});
	}

	Room.findOneAndUpdate(
		{
			$and: [
				{ chatters: { $elemMatch: { chatterId: data.admin } } },
				{ chatters: { $elemMatch: { chatterId: data.company } } },
				{ chatters: { $elemMatch: { chatterId: data.user } } },
			],
		},
		{ $set: { chatters: chatters } },
		{ upsert: true, new: true }
	)
		.lean()
		.then((res) => {
			socket.join(res._id.toString());
			socket.emit('sendRoom', res);
		});
};

const disconnect = () => {
	console.log('Client disconnected'); // Khi client disconnect thì log ra terminal.
};
