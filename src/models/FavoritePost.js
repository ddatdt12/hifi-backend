const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const FavoritePostSchema = new Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		post: {
			type: mongoose.Types.ObjectId,
			ref: 'Post',
		},
	},
	{
		timestamps: true,
	}
);
FavoritePostSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('FavoritePost', FavoritePostSchema);
