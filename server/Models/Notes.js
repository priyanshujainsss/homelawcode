const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
 
  ChapterName: {
    type: String,
    required: true,
  },
  NoteData:{
      type:String
  },
  NoteDate:{
      type:String
  }
});
const Notes = mongoose.model("notes", noteSchema);
module.exports =  Notes 
