const mongoose = require("mongoose");

//blogSchema is an object that describes the structure of a blog
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  author: {
    type: String,
    required: true,
    minlength: 2,
  },
  url: {
    type: String,
    required: true,
    minlength: 4,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

//noteSchema.set('toJSON', { virtuals: true }); means that virtuals will be included in the JSON output
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
