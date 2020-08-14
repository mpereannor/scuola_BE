const multer = require('multer');
const { BadRequest } = require('../../authentication/middlewares/auth-errors');

const upload = multer({ 
    limits: { fileSize: 1000000 },
    fileFilter(req, file, cb){ 
        if(!file.originalname.match(/\.(png|jpeg|jpg)$/)){ 
            return cb('Please upload an image')
        }
        cb(undefined, true)
    }
});


const helper = (error,req, res, next) => { 
    throw new BadRequest(error.message)
}


module.exports = {upload}