import express from 'express';
import cors from 'cors';
import routes from './routes/index';

const app = express();

const PORT = 3000;

app.use(cors());

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => console.log(`Server start working on port ${PORT}`))