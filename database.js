const db = require('./src/models');

const connectDB = () => {
	db.mongoose
		.connect(db.url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			ignoreUndefined: true,
		})
		.then(() => {
			console.log('Connected to the database!');
		})
		.catch((err) => {
			console.log('Cannot connect to the database!', err);
			process.exit();
		});
};

module.exports = connectDB;
