const mongoose = require("mongoose");
const highlightSchema = new mongoose.Schema({
 
  ChapterName: {
    type: String,
    required: true,
  },
  HighlightedData:{
      type:String
  },
  HighlightDate:{
      type:String
  }
});
const Highlights = mongoose.model("highlights", highlightSchema);
module.exports =  Highlights 
