const Room = require('../models/Room');

const sendDataClient = (data, io) => {
	Room.findOneAndUpdate(
		{ _id: data.room },
		{ $push: { messages: data.message } },
		{ new: true }
	)
		.populate('chatters')
		.then((res) => {
			// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
			io.in(data.room).emit('sendDataServer', res);
		})
		.catch((error) => {
			console.log(error);
		});
};

module.exports = { sendDataClient };
