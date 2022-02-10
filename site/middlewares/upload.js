const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/img/imgProduct"));
    },
    filename: function (req, file, cb) {
      const newFileName = Date.now() + '-' + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + newFileName)
    }
  });
  const upload = multer({ storage: storage })

  module.exports = upload;