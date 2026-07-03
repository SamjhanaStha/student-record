import multer from "multer";
import path from "path"
import { fileURLToPath } from "url";

const fileNamePath = fileURLToPath(import.meta.url)
const dirPath = path.dirname(fileNamePath)
// console.log(fileNamePath, dirPath)
// diskStorage decide where to save and which filename to use 
let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        // choosing src/uploads folder to upload the file
        // console.log(file.fieldname)
        cb(null, path.join(dirPath, '..', 'uploads'))
    },
    filename: (req, file, cb)=>{
        let suffix = Date.now() + "-" + Math.round(Math.random() * 1e9) //10^9-> 1e9
        let extention = path.extname(file.originalname) //.png
        cb(null, `${file.fieldname}-${suffix}${extention}`)
    },
})

export let upload = multer({
    storage: storage,
    fileFilter: null,
    limits: {
        fileSize: 5 * 1024 * 1024 //5Mb
    }
})