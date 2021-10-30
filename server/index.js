const requireAuth=require("./Middleware/requireAuth");
const express =require("express")
const cors=require("cors");
const path=require('path')
const dotenv=require("dotenv");
dotenv.config();

require("./db/connection")
// const port=process.env.port||4000;
const app=express();
app.use(cors())
app.use(express.json())
app.set('view engine', 'ejs');
<<<<<<< HEAD
app.use("/lawcodeassets",express.static(path.join(__dirname,"lawcodeassets")))
=======
app.use("/images",express.static(path.join(__dirname,"images")))
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
app.use(require("./Routes/user.routes"));
app.get("/",(req,res)=>{
    res.send({msg:"Server is running"})
// console.log("app is working")
})

//terms and condtions api
app.get("/terms",(req,res)=>{
    res.render('termAndCondition')
})

app.listen(process.env.PORT,()=>{
    console.log("App is running on ",process.env.HOST_URL)
})
