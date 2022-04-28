const fs = require('fs');
const path = require('path');

const getAllController = (dirname, basename) => {
	let controllers = {};

	fs.readdirSync(dirname)
		.filter((file) => {
			return (
				file.indexOf('.') !== 0 &&
				file !== basename &&
				file.slice(-3) === '.js'
			);
		})
		.forEach((file) => {
			const controller = require(path.join(dirname, file));
			controllers[file.slice(0, -3)] = controller;
		});

	return controllers;
};

module.exports = { getAllController };
