const path = require('path');
const { getAllController } = require('../../utils/requireController');
const basename = path.basename(__filename);

var controllers = getAllController(__dirname, basename);

module.exports = {
	companyController: require('./companyController'),
	categoryController: require('./categoryController'),
	skillController: require('./skillController'),
	postController: require('./postController'),
	subcategoryController: require('./subcategoryController'),
	userController: require('./userController'),
	applicationController: require('./applicationContronller'),
};
