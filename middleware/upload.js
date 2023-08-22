const path = require('path')
const multer = require('multer')
const { fileURLToPath } = require('url')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (
            filename.mimetype == "image/png" ||
            filename.mimetype == "image/jpg"
        ) {
            callback(null, true)
        } else {
            console.log("only jpg & png file supperted !!")
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload