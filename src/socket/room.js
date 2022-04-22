const Room = require('../models/Room');

const joinRoom = (socket, data) => {
	Room.findOneAndUpdate({ _id: data }, {}, { upsert: true })
		.populate('chatters')
		.then((res) => {
			socket.join(res._id.toString());
			socket.emit('sendRoom', res);
		})
		.catch((err) => {
			console.log(err);
		});
};

const disconnect = () => {
	console.log('Client disconnected'); // Khi client disconnect thì log ra terminal.
};

module.exports = { joinRoom, disconnect };
