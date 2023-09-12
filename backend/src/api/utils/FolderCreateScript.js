const fs = require('fs');
const path = require('path');

function createFolder(folderPath) {
  // Create the folder recursively
  fs.mkdirSync(folderPath, { recursive: true });
  console.log(`Folder created: ${folderPath}`);
}

module.exports = createFolder;

// Use:  createFolder('path/to/your/folder');
