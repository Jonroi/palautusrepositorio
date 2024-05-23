import express from 'express'
import { calculator, Operation } from './calculator'

const app = express()

app.use(express.json())

app.get('/hello', (_reg, res) => {
  res.send('Hello Full Stack!')
})

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: 'malformatted parameters for value1' })
  }

  if (!value2 || isNaN(Number(value2))) {
    return res.status(400).send({ error: 'malformatted parameters for value2' })
  }

  const validOps = ['add', 'subtract', 'multiply', 'divide']
  if (!op || !validOps.includes(op)) {
    return res
      .status(400)
      .send({ error: 'malformatted parameters for operation' })
  }

  try {
    const operation = op as Operation
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculator(Number(value1), Number(value2), operation)

    res.send({ result })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

const Port = 3003
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`)
})
