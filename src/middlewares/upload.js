const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinaryStorage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: {
      folder: 'el-coffee',
   },
});

// menentukan ukuran
const limit = {
   fileSize: 2e6,
};

//  menentukan ektensi file upload
const imageOnlyFilter = (req, file, cb) => {
   const extName = path.extname(file.originalname);
   const allowedExt = /jpg|jpeg|png|JPG|JPEG|PNG/;
   if (!allowedExt.test(extName)) return cb(new Error('File Extension JPG or PNG 2mb'), false);
   cb(null, true);
};

// upload image
const imageUpload = multer({
   // storage: imageStorage,
   storage: cloudinaryStorage,
   limits: limit,
   fileFilter: imageOnlyFilter,
}).single('photo');

const upload = (req, res, next) => {
   imageUpload(req, res, (err) => {
      if (err) {
         res.status(400).json({
            error: err.message,
         });
         return;
      }
      next();
   });
};

module.exports = {
   upload,
};

// const storage = multer.diskStorage({
//    destination: (req, file, cb) => {
//       cb(null, './public/images');
//    },
//    filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//       const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
//       cb(null, filename);
//    },
// });
