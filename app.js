const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');

const globalErrorHandler = require('./src/middlewares/globalErrorHandler');
const AppError = require('./src/utils/AppError');
const authRoute = require('./src/routes/auth');
const adminRoute = require('./src/routes/admin');
const jobSeekerRoute = require('./src/routes/job_seeker');
const recruiterRoute = require('./src/routes/recruiter');
const suggestionRoute = require('./src/routes/suggestion');
//Config
const app = express();
app.use(
	cors({
		origin: true,
		credentials: true,
	})
);
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

app.get('/', (req, res) => {
	res.send('HELLO HiFi');
});
app.use('/api/admin', adminRoute);
app.use('/api/auth', authRoute);
app.use('/api/job-seeker', jobSeekerRoute);
app.use('/api/recruiter', recruiterRoute);
app.use('/api/suggestion', suggestionRoute);

app.all('*', (req, res, next) => {
	const error = new AppError(
		`Can't find ${req.originalUrl} on this server`,
		404
	);
	next(error);
});

app.use(globalErrorHandler);

module.exports = app;
