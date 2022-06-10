const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
	text: {
		type: String,
		required: [true, 'Vui lòng nhập tên skill'],
	},
});
SkillSchema.statics.search = function (q, selected, limit) {
	const andQuery = [{ text: new RegExp(q, 'gi') }];
	if (selected && selected.length > 0) {
		andQuery.push({
			_id: { $nin: selected },
		});
	}
	let query = this.find({
		$and: andQuery,
	});
	if (limit) {
		query.limit(limit);
	}
	return query;
};

module.exports = mongoose.model('Skill', SkillSchema);
