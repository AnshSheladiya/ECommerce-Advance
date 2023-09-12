// Function to filter unique values from an array
function uniqueValues(arr) {
    if (!Array.isArray(arr)) {
      throw new Error('Invalid input. Expecting an array.');
    }
  
    return [...new Set(arr)];
  }

  // Function to remove duplicates from an array
function removeDuplicates(arr) {
    if (!Array.isArray(arr)) {
      throw new Error('Invalid input. Expecting an array.');
    }
  
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  // Function to sort an array in ascending order
function sortAscending(arr) {
    if (!Array.isArray(arr)) {
      throw new Error('Invalid input. Expecting an array.');
    }
  
    return arr.slice().sort((a, b) => a - b);
  }
  
  // Function to sort an array in descending order
  function sortDescending(arr) {
    if (!Array.isArray(arr)) {
      throw new Error('Invalid input. Expecting an array.');
    }
  
    return arr.slice().sort((a, b) => b - a);
  }

  // Function to check if an array contains a specific value
function containsValue(arr, value) {
    if (!Array.isArray(arr)) {
      throw new Error('Invalid input. Expecting an array.');
    }
  
    return arr.includes(value);
  }

  module.exports = {uniqueValues ,removeDuplicates,sortAscending,sortDescending,containsValue};

