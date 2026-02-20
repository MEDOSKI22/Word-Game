import express from 'express';
import './config/db.js';
import scoresRoutes from './routes/scoresRoutes.js';

const app = express();
const port = 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api/v1/scores', scoresRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(port, () => {
  console.log(`Server is live on port: ${port}`);
});
