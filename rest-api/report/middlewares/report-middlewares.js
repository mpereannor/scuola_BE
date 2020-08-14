const multer = require('multer');
const { BadRequest } = require('../../authentication/middlewares/auth-errors');

const upload = multer({ 
    limits: { fileSize: 1000000 },
    fileFilter(req, file, cb){ 
        if(!file.originalname.match(/\.(doc|docx|pdf)$/)){ 
            return cb('Please upload a PDF  or a word document')
        }
        cb(undefined, true)
    }
});


const helper = (error,req, res, next) => { 
    throw new BadRequest(error.message)
}


module.exports = {upload}