const multer = require("multer");

const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    cb(null, path.join(__dirname, "../public/images/"));
  },
 
    filename:(req, file, cb)=>{
   
      cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);// file name setti
  },
});

let upload = multer({
  storage: storage,
  
});



module.exports = { upload};