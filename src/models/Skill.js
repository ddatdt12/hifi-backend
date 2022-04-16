const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
	text: {
		type: String,
		required: [true, 'Vui lòng nhập tên skill'],
	},
});
SkillSchema.statics.search = function (q, selected) {
	return this.find({
		$and: [
			{
				_id: { $nin: selected },
			},
			{ text: new RegExp(q, 'gi') },
		],
	});
};

module.exports = mongoose.model('Skill', SkillSchema);
