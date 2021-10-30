const multer=require("multer");
const path=require("path");

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'lawcodeassets')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});
const filefilter=(req,file,cb)=>{
    if(file.mimetype === "application/pdf" || file.mimetype ==="application/x-pdf"){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const uploadpdf=multer({storage:storage, fileFilter:filefilter})
module.exports={uploadpdf}