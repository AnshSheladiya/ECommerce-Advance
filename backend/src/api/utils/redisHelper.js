const redis = require('redis');
const client = redis.createClient();

exports.getFromRedis = (key, callback) => {
  client.get(key, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      // Data found in cache, return it
      callback(JSON.parse(data));
    } else {
      // Data not found in cache, call the callback without data
      callback(null);
    }
  });
};

exports.setToRedis = (key, data, expiryInSeconds) => {
  // Set data in Redis cache with a TTL (time-to-live)
  client.setex(key, expiryInSeconds, JSON.stringify(data), (err) => {
    if (err) throw err;
  });
};
