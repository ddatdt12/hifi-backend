const dbConfig = require('../configs/db.config.js');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js'
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file));
		db[model.modelName] = model;
	});

module.exports = db;
