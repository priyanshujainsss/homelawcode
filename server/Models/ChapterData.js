const mongoose = require("mongoose");
const chapterdataSchema = new mongoose.Schema({
 
  ChapterId: {
    type: String,
    required: true,
  },
  Ispdf:{
    type:String
  },
  PdfUrl:{
      type:Boolean
  },
  ChapterText:{
      type:String
  }
});
const ChapterData = mongoose.model("chapterdata", chapterdataSchema);
module.exports =  ChapterData 
