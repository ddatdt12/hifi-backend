const ObjectId = require('mongoose').Types.ObjectId;

const Utils = {
	excludeFields(object, ...excludedFields) {
		const newObj = {};
		Object.keys(object).forEach((el) => {
			if (!excludedFields.includes(el)) newObj[el] = object[el];
		});
		return newObj;
	},
	filterObject(object, ...allowedFields) {
		const newObj = {};
		Object.keys(object).forEach((el) => {
			if (allowedFields.includes(el)) newObj[el] = object[el];
		});
		return newObj;
	},
	convertBooleanQuery(object, ...fields) {
		Object.keys(object).forEach((el) => {
			if (fields.includes(el)) object[el] = object[el] === '1';
		});
	},
	objIsEmpty(obj) {
		return Object.keys(obj).length === 0;
	},
	convertNestedObjectQuery(objectName, object) {
		const newObj = {};
		Object.keys(object).forEach((k) => {
			newObj[`${objectName}.${k}`] = object[k];
		});

		return newObj;
	},

	validateEmail(email) {
		const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		return re.test(email);
	},

	isValidObjectId(id) {
		if (ObjectId.isValid(id)) {
			if (String(new ObjectId(id)) === id) return true;
			return false;
		}
		return false;
	},
};
module.exports = Utils;
