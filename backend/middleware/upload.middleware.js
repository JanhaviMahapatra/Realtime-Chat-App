import multer from "multer";
import path from "path";
import fs from "fs";

//Upload directory
const uploadDir = "uploads";

//Create uploads folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

//File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    //Images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",

    //GIF
    "image/gif",

    //Documents
    "application/pdf",
    "text/plain",

    //Microsoft files
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    //For ZIP
    "application/zip",
    "application/x-zip-compressed",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "This file type is not supported."
      ),
      false
    );
  }
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;