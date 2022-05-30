const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
	{
		chatters: [
			{
				chatterId: String,
				name: String,
				avatar: String,
				type: String,
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
		typeKey: '$type',
	}
);

module.exports = mongoose.model('Room', RoomSchema);
