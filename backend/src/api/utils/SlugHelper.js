// Slugify a string by removing special characters and spaces
function slugify(str) {
    if (typeof str !== 'string') {
      throw new Error('Invalid input. Expecting a string.');
    }
  
    return str
      .toLowerCase()
      .replace(/[^\w\s]+/g, '')   // Remove special characters
      .trim()                    // Remove leading and trailing spaces
      .replace(/\s+/g, '-')      // Replace spaces with dashes
      .replace(/-{2,}/g, '-');   // Replace consecutive dashes with a single dash
  }
  
  module.exports = { slugify };
  


//   const { slugify } = require('./api/utils/SlugHelper');
//   const title = "Hello World! This is an Example Title.";
//   const slug = slugify(title);
//   console.log(slug); 

//   Output: "hello-world-this-is-an-example-title"