import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { getById, getAll } from './initDB';

dotenv.config();
const app: express.Application = express();
app.use(cors());

const port = process.env.PORT || 3000;
const host = '0.0.0.0';

app.listen(Number(port), host, async(): Promise<void> => {
  console.log(`App listening at http://${host}:${port}`);
});


app.get('/', (req: Request, res: Response): void => {
  res.json('Send a request to /id or /random');
});

// get quote by id
app.get('/id/:id', async(req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const quote = await getById(id);
  quote === null 
    ? res.send('Quote not found')
    : res.json(quote);
});

// get random quote
app.get('/random', async (req: Request, res: Response): Promise<void> => {
  const allQuotes = await getAll();
  if(allQuotes === null){
    res.send('Error with fetching quotes.');
    return;
  }
  const numQuotes = allQuotes?.length;
  if(numQuotes === undefined) {
    res.send('Error with finding random quote.');
    return;
  }
  const randomIndex = Math.floor(Math.random() * numQuotes);
  res.json(allQuotes[randomIndex]);
});

// Handle 404 errors
app.use((req: Request, res: Response) => {
    res.status(404).send('Unable to find that page');
});

export default app;
