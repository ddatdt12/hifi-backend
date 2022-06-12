module.exports = {
	origin:
		process.env.NODE_ENV === 'development'
			? true
			: 'https://hifi.vercel.app/',
	credentials: true,
};
