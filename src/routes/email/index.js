const express = require('express');

const router = express.Router();
const emailController = require('../../controllers/emailController');

module.exports = (app) => {
	router.post('/verify-account', emailController.sendEmailVerification);
	router.post('/send-code', emailController.sendEmailCodeVerification);
	router.post('/code-verification', emailController.checkVerificationCode);
	router.get(
		'/verify-account/:accountId/:token',
		emailController.verifyTokenEmail
	);
	app.use('/api/email', router);
};
