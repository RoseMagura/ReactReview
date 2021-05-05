import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { testConn } from './initDB';

dotenv.config();
const app: express.Application = express();
app.use(cors());

const port = process.env.PORT || 3000;
const host = '0.0.0.0';

app.listen(Number(port), host, (): void => {
  console.log(`App listening at http://${host}:${port}`);
  testConn();
});


app.get('/', (req: Request, res: Response): void => {
  res.send('Ready to go');
});

// get quote by id

// get random quote

// post quote

// Handle 404 errors
app.use((req: Request, res: Response) => {
    res.status(404).send('Unable to find that page');
});

export default app;
