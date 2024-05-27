const multer = require("multer");
const path = require("path");

// multer configuration
exports.videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/video/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

exports.videoFilter = function (req, file, cb) {
  const extension = path.extname(file.originalname).toLowerCase();
  const mimetyp = file.mimetype;
  
  const validVideoExtensions = ['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv'];
  const validVideoMimeTypes = [
    'video/mp4',
    'video/x-matroska',
    'video/x-msvideo',
    'video/quicktime',
    'video/x-ms-wmv',
    'video/x-flv'
  ];

  if (validVideoExtensions.includes(extension) && validVideoMimeTypes.includes(mimetyp)) {
    return cb(null, true);
  }
  
  cb("Invalid video format", false);
};
