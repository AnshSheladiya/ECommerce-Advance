/**
 * File Name: auth.js
 */

const helloWorldService = require('../services/auth');

const helloWorldController = async (req, res) => {
  try {
    const message = await helloWorldService.getHelloWorld();
    res.status(200).send(message);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  helloWorldController,
};
