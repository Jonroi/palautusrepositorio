import express from 'express';
import router from './routes/diaries';

const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/api/diaries', router);
console.log('fetching diaries');

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
