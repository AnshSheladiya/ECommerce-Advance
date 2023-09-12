const cron = require('node-cron');
const axios = require('axios');

const scheduleInterval = '*/10 * * * * *'; // Every 10 seconds

// const cronTask = cron.schedule(scheduleInterval, async () => {
//   try {
//     // Make a request to the '/add-products' API
//     const response = await axios.get('http://localhost:8383/add-products');
//     console.log('API called:','Created-->>>', response.data.length);
//   } catch (error) {
//     console.error('Error calling API:', error.message);
//   }
// });

// Start the cron task
// cronTask.start();