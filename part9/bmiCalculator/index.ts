import express from 'express'
import { calculateBmi, getBmiCategory } from './bmiCalculator'

const app = express()

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }

  try {
    const bmi = calculateBmi(weight, height)
    const category = getBmiCategory(bmi)

    res.json({
      weight,
      height,
      bmi: category
    })

    return
  } catch (error: any) {
    return res.status(400).json({ error: error.message }) // Add 'return' here
  }
})

const Port = 3003
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`)
})
