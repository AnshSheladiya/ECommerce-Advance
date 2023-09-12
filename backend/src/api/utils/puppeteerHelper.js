const puppeteer = require('puppeteer');

const puppeteerHelper = {
  browser: null,
  page: null,

  // Function to launch the headless browser
  launch: async () => {
    puppeteerHelper.browser = await puppeteer.launch();
    puppeteerHelper.page = await puppeteerHelper.browser.newPage();
  },

  // Function to navigate to a URL
  goTo: async (url) => {
    await puppeteerHelper.page.goto(url);
  },

  // Function to click on an element
  click: async (selector) => {
    await puppeteerHelper.page.waitForSelector(selector);
    await puppeteerHelper.page.click(selector);
  },

  // Function to type text into an input field
  typeText: async (selector, text) => {
    await puppeteerHelper.page.waitForSelector(selector);
    await puppeteerHelper.page.type(selector, text);
  },

  // Function to take a screenshot
  takeScreenshot: async (path) => {
    await puppeteerHelper.page.screenshot({ path });
  },

  // Function to get the content of a page
  getContent: async () => {
    return await puppeteerHelper.page.content();
  },

  // Function to close the browser
  close: async () => {
    await puppeteerHelper.browser.close();
  },
};

module.exports = puppeteerHelper;
