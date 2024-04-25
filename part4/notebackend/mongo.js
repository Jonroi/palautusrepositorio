/* eslint-disable @stylistic/js/semi */
/* eslint-disable @stylistic/js/quotes */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `  mongodb+srv://user:${password}@noteapp.otvtpot.mongodb.net/?appName=noteAppretryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
  })

  const Note = mongoose.model('Note', noteSchema)

  Note.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note)
    })
    mongoose.connection.close()
  })
})
