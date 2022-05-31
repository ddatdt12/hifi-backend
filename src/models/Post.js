const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
	{
		title: String,
		jobType: String,
		jobCategory: {
			type: mongoose.Schema.ObjectId,
			ref: 'Subcategory',
		},
		salary: {
			min: Number,
			max: Number,
			unit: String,
			negotiable: Boolean,
		},
		description: String,
		skillTags: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Skill',
			},
		],
		preferedLangs: [String],
		locations: [String],
		applicationDeadline: {
			type: Date,
			required: true,
		},
		verficationStatus: {
			type: String,
			enum: ['fulfilled', 'pending', 'rejected', 'deleted'],
			default: 'pending',
		},
		company: {
			type: mongoose.Types.ObjectId,
			ref: 'Company',
		},
	},
	{
		timestamps: true,
	}
);

PostSchema.plugin(mongoosePaginate);

PostSchema.index({ title: 'text' });
const Post = mongoose.model('Post', PostSchema);
// Post.createIndexes({ title: 'text' });

module.exports = Post;
