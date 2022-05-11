const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const app = express();
const fs = require('fs');
const path = require('path');
const corsOptions = require('./src/configs/cors.config');

const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./src/middlewares/globalErrorHandler');
const AppError = require('./src/utils/AppError');
const routesDirName = `${__dirname}/src/routes/`;

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

// Require all routes
fs.readdirSync(routesDirName)
	.filter((file) => fs.statSync(path.join(routesDirName, file)).isDirectory()) // filter only folder
	.map((folder) => {
		require(path.join(routesDirName, folder))(app);
	});

app.get('/', (req, res, next) => {
	// res.send('HELLO HiFi');
	const error = new AppError(`Error on this server`, 404);
	return next(error);
});

// Require all routes
fs.readdirSync(routesDirName)
	// .filter((file) => fs.statSync(path.join(routesDirName, file)).isDirectory()) // filter only folder
	.map((folder) => {
		require(path.join(routesDirName, folder))(app);
	});

app.all('*', (req, res, next) => {
	const error = new AppError(
		`Can't find ${req.method} ${req.originalUrl} on this server`,
		404
	);
	next(error);
});

app.use(globalErrorHandler);

module.exports = app;
