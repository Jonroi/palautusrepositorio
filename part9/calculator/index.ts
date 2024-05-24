import express from 'express';
import { calculator, Operation } from './calculator';

const app = express();

app.use(express.json());

interface CalculateRequestBody {
  value1: number;
  value2: number;
  operation: Operation;
}

app.get('/hello', (_reg, res) => {
  res.send('Hello Full Stack!');
});

app.post('/calculate', (req, res) => {
  const { value1, value2, operation } = req.body as CalculateRequestBody;

  if (!value1 || isNaN(Number(value1))) {
    return res
      .status(400)
      .send({ error: 'malformatted parameters for value1' });
  }

  if (!value2 || isNaN(Number(value2))) {
    return res
      .status(400)
      .send({ error: 'malformatted parameters for value2' });
  }

  const validOps = ['add', 'subtract', 'multiply', 'divide'];
  if (!operation || !validOps.includes(operation)) {
    return res
      .status(400)
      .send({ error: 'malformatted parameters for operation' });
  }

  try {
    const result = calculator(Number(value1), Number(value2), operation);

    return res.send({ result });
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
