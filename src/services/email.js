const nodemailer = require('nodemailer');

const EmailService = {
	sendVerificationEmail: async ({ email, message }) => {
		// 1) Create a transporter
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: 587,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		// 2) Define the email options
		const mailOptions = {
			from: '"Hifi Job Connection" <ddatdt12@gmail.com>',
			to: email,
			subject: 'Account Verification',
			text: message,
			html: `<p>${message}</p>`,
		};

		const res = await transporter.sendMail(mailOptions);
		console.log(res);
	},
};

module.exports = EmailService;
