import express from 'express'
const app = express()

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!')
})

const Port = 3003
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`)
})
