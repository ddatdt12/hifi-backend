const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
	text: {
		type: String,
		required: [true, 'Vui lòng nhập tên skill'],
	},
});
SkillSchema.statics.search = function (q, selected, limit) {
	let query = this.find({
		$and: [
			{
				_id: { $nin: selected },
			},
			{ text: new RegExp(q, 'gi') },
		],
	});
	if (limit) {
		query.limit(limit);
	}
	return query;
};

module.exports = mongoose.model('Skill', SkillSchema);
