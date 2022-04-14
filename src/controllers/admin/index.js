const path = require('path');
const { getAllController } = require('../../utils/requireController');
const basename = path.basename(__filename);

var controllers = getAllController(__dirname, basename);

module.exports = {
	...controllers,
};
