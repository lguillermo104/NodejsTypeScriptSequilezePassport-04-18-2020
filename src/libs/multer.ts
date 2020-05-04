import multer, { } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage =multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb)  => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});



export default multer(
    { 
        storage, 
        limits : {fileSize: 1000000 },
        fileFilter: function(req, file, cb){
            checkFileType(file, cb);
        }

    });

    function checkFileType(file:any, cb:any){
       // Allow ext
       const filetypes = /jpeg|jpg|png|gif/;

       // check the extencion.

       const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

       // check the mimetype
       const mimetype = filetypes.test(file.mimetype);

       if (mimetype && extname) {
           return cb(null, true)
       }else {
           cb('Error: Solo acepta imagenes ')
       }
        

    }

   