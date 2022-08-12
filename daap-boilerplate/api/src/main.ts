import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello from DApp API");
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: DApp API Server is running at http://localhost:${port}`
  );
});
