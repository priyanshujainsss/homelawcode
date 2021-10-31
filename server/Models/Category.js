const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
 
  CategoryName: {
    type: String,
    required: true,
  },
  State:{
    type:String
  },
  Latitude:{
    type:Number
  },
  Longitude:{
    type:Number
  },
  Image:{
    type:String
  },
  Color:{
    type:String
  }  
});
const Categorys = mongoose.model("categories", categorySchema);
module.exports =  Categorys 
