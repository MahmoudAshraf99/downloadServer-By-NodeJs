const multer = require('multer')
const storageSystem = ()=>{
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, process.cwd() + "/public/uploads")
        },
        filename: function (req, file, cb) {
            cb(null,file.originalname)
        }
    })
    var upload = multer({ storage: storage })
    var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdfFile', maxCount: 1 }])
    return cpUpload;
}

module.exports = storageSystem;
