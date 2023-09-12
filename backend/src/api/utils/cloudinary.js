//cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('../config/config');

cloudinary.config({
  cloud_name: "dsclrzfoz",
  api_key: "287784753466293",
  api_secret: "_xUc9Fire2JD6BhSrNYslNw__so",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ECommerce_Advance',
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4'], // Add 'mp4' here for video support
    // Transformation settings for video (modify as needed)
    resource_type: 'video',
    format: 'mp4',
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const parser = multer({ storage: storage });

module.exports = { cloudinary, parser };
