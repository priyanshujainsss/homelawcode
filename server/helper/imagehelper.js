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
    if(file.mimetype === "image/png" || file.mimetype ==="image/jpg" || file.mimetype === "image/jpeg"){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const uploadimage=multer({storage:storage, fileFilter:filefilter})
module.exports={uploadimage}
