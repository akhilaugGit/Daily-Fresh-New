const multer = require("multer");
const cloudinary = require("./cloudinaryConfig");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "teachers", // Folder in Cloudinary
    allowed_formats: ["jpeg"], // Correct formats
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
