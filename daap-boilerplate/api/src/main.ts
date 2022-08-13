import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { getContract } from "./contract";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const contract = getContract();

app.get("/", async (req: Request, res: Response) => {
  const response = await contract.sayHelloWorld();
  res.send(response);
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: DApp API Server is running at http://localhost:${port}`
  );
});
