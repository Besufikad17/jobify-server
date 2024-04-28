import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("<h1>Welcome to Jobify backend</h1>");
});

app.listen(5000);
