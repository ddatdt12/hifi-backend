const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
	{
		chatters: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'User',
			},
		],
		messages: [
			{
				userId: mongoose.Types.ObjectId,
				content: String,
				createdAt: Date,
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Room', RoomSchema);
