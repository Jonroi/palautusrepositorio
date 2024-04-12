const mongoose = require("mongoose");

if (process.argv.lenght < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url =
  "mongodb+srv://user:user123@noteapp.otvtpot.mongodb.net/?retryWrites=true&w=majority&appName=noteApp";
mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteScheama = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteScheama);

const note = new Note({
  content: "HTML is easy",
  important: true,
});

note.save().then((result) => {
  console.log("note saved");
  mongoose.connection.close();
});

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
