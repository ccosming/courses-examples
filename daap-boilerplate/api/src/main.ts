import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { getDigitalIdentityContract, getHelloWorldContract } from "./contract";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", async (req: Request, res: Response) => {
  const contract = getHelloWorldContract();
  const response = await contract.sayHelloWorld();
  res.json({
    message: response,
  });
});

app.get("/persons/count", async (req: Request, res: Response) => {
  const contract = getDigitalIdentityContract();
  const response = await contract.getPersonsCount();

  res.json({
    count: response.toNumber(),
  });
});

app.get("/persons/add", async (req: Request, res: Response) => {
  const contract = getDigitalIdentityContract();

  await contract.addPerson(
    req.query.name as string,
    req.query.lastname as string,
    Number(req.query.age)
  );

  res.json({
    result: true,
  });
});

app.get("/persons/get", async (req: Request, res: Response) => {
  const contract = getDigitalIdentityContract();

  const person = await contract.getPerson(Number(req.query.id));

  res.json({
    name: person[1],
    lastname: person[2],
    age: person[3].toNumber(),
  });
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: DApp API Server is running at http://localhost:${port}`
  );
});
