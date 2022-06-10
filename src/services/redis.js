const redis = require('redis');

const client = redis.createClient({
	url: process.env.REDIS_ENDPOINT_URI,
	password: process.env.REDIS_PASSWORD,
});
client.on('connect', () => {
	console.log('Connected to Redis...');
});
client.on('error', (err) => console.log('Redis Client Error: ', err));
const getOrSetCache = async (key, cb) => {
	const data = await client.get(key);
	if (data) {
		console.log('Cache hit: ', key);
		return JSON.parse(data);
	}
	const freshData = await cb();
	console.log('Cache missing: ', key);
	client.setEx(key, 60 * 60 * 24, JSON.stringify(freshData));
	return freshData;
};

const deleteKeyIfExist = async (key) => {
	if (await client.exists(key)) {
		await client.del(key);
	}
};

module.exports = { client, getOrSetCache, deleteKeyIfExist };
