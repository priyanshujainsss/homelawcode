const multer=require("multer");
const path=require("path");

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
<<<<<<< HEAD
        cb(null,'lawcodeassets')
=======
        cb(null,'images')
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
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

<<<<<<< HEAD
const uploadimage=multer({storage:storage, fileFilter:filefilter})
module.exports={uploadimage}
=======
const upload=multer({storage:storage, fileFilter:filefilter})
module.exports={upload}
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
