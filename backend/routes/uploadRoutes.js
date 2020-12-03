import path from 'path'
import express from 'express'
import multer from 'multer'

const router=express.Router();

const storage = multer.diskStorage({
    destination:function(req, file, cb) {
        console.log("@")
      cb(null, 'uploads/')
    },
    filename:function(req, file, cb) {
      
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
  })

function checkFileType(file,cb){
   // console.log("123456")
    const filetypes=/jpg|png|jpeg/
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype=filetypes.test(file.mimetype)
    if(extname && mimetype){
        return cb(null,true)
    }else{
        cb('Images Only!')
    }

}

const upload=multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    }
})

router.post('/',upload.single('image'),(req,res)=>{
  
   // console.log('** seli ',req.file)
    res.send(`/${req.file.path}`)
   
})


export default router


