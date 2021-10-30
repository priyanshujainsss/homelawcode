const mongoose = require("mongoose");
const bookmarkSchema = new mongoose.Schema({
 
  BookmarkTitle: {
    type: String,
    required: true,
  },
  ChapterId:{
      type:String
  },
  ChapterName:{
      type:String
  }
});
const Bookmarks = mongoose.model("bookmarks", bookmarkSchema);
module.exports =  Bookmarks 
