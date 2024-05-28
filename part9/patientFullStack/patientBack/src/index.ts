import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from the frontend's dist directory
app.use(express.static(path.join(__dirname, '../../patientorFront/dist')));

// Example endpoint
app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

// Handle all other routes and serve the index.html file
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../patientFront/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
