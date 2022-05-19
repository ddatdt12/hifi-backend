require('dotenv').config();

const sanitizeRedisUrl = (url) => url.replace(/^(redis:\/\/)/, '');

const { REDIS_ENDPOINT_URI, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } =
	process.env;

module.exports = {
	url: process.env.DATABASE_URL,
	redis: {
		endpointUri: REDIS_ENDPOINT_URI
			? sanitizeRedisUrl(REDIS_ENDPOINT_URI)
			: `${sanitizeRedisUrl(REDIS_HOST)}:${REDIS_PORT}`,
		password: REDIS_PASSWORD || undefined,
	},
};
