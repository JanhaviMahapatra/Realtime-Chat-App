import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
storage,

fileFilter: (req, file, cb) => {
const allowedTypes = [
"image/jpeg",
"image/jpg",
"image/png",
"image/webp",
"image/gif",

"application/pdf",
"text/plain",

"application/msword",
"application/vnd.openxmlformats-officedocument.wordprocessingml.document",

"application/vnd.ms-excel",
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

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
},

limits: {
fileSize: 10 * 1024 * 1024,
},
});

export default upload;