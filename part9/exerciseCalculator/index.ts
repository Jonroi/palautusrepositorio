import express from 'express';
import { calculateExercise, exerciseResult } from './exerciseCalculator';

const app = express();
app.use(express.json());

interface CalculateRequestBody {
  dailyHours: number[];
  target: number;
}

app.post('/exercises', (req, res) => {
  const requestBody = req.body as CalculateRequestBody;
  const { dailyHours, target } = requestBody;

  if (!dailyHours || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  if (!Array.isArray(dailyHours) || dailyHours.length === 0) {
    return res
      .status(400)
      .send({ error: 'dailyHours should be a non-empty array' });
  }

  if (dailyHours.some(isNaN) || isNaN(target)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  try {
    const result: exerciseResult = calculateExercise(dailyHours, target);
    return res.send(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    } else {
      return res.status(400).send({ error: 'An unknown error occurred' });
    }
  }
});

const Port = 3003;
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
