const NodeCache = require('node-cache');
const config = require('../config/config');
const cache = new NodeCache();
const expirationTimeInSeconds=config.CacheExpirationTimeInSeconds;

// Helper function to generate a cache key
function generateCacheKey(userData, pipeline) {
  // Generate a unique cache key based on the userData and pipeline
  // You can use a combination of userData and pipeline properties
  // to create a unique identifier for caching
  // Example: return `${userData.id}_${JSON.stringify(pipeline)}`;
  return `${userData.id}_${JSON.stringify(pipeline)}`
}

// Helper function to get the cache statistics
function getCacheStats() {
  return cache.getStats();
}

// Helper function to clear the entire cache
function clearCache() {
  cache.flushAll();
}

function withCache(originalFunction) {
  return async (...args) => {
    const cacheKey = generateCacheKey(...args);
    const result = cache.get(cacheKey);

    if (result) {
      return result;
    }

    const data = await originalFunction(...args);
    cache.set(cacheKey, data, expirationTimeInSeconds);
    return data;
  };
}

module.exports = {
  cache,
  generateCacheKey,
  withCache,
  getCacheStats,
  clearCache
};


