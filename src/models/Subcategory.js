const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: [true, 'Please enter name!'],
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: [true, 'Subcategory must belong to a category'],
	},
	companies: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Company',
		},
	],
});

module.exports = mongoose.model('Subcategory', SubcategorySchema);
