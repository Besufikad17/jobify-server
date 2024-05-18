import express, { Request, Response } from 'express';
import cors from 'cors';
import { route } from './routes/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', route);

app.get('/', (req: Request, res: Response) => {
	res.send('<h1>Welcome to Jobify backend</h1>');
});

app.listen(5000);
