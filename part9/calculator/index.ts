import express from 'express'
import { calculator } from './calculator'

const app = express()

app.use(express.json())

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!')
})

app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body

  const result = calculator(value1, value2, op)
  res.send({ result })
})

const Port = 3003
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`)
})
