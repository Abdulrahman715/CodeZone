
const express = require('express');

const router = express.Router();

const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log("file", file);
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    const extension = file.mimetype.split('/')[1]; 
    const fileName = `user - ${Date.now()}.${extension}`; // علشان لو اتنين بيرفعوا نفس اسم الصورة وليكن image.png
    callback(null, fileName);
  },
});


//don't put a thing not image
const fileFilter = (req,file,cb) => {
  const imageType = file.mimetype.split('/')[0];
  
  if (imageType === 'image') {
    return cb(null, true);
  } else {
    return cb("this not image", false);
  }
}

const upload = multer({
  storage: diskStorage,
  fileFilter
});

const userController = require('../controllers/users.controller');

const verifyToken = require('../Middleware/verifytoken');
//get all users
//register
//login

//if found token , it will show all users
router.route("/").get(verifyToken, userController.getAllUsers);

router
  .route('/register')
  .post(upload.single('avatar'), userController.Register);  

router
  .route("/login")
  .post(userController.login);


module.exports = router;