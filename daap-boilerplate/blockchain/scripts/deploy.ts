import { ethers } from "hardhat";

async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const helloWorld = await HelloWorld.deploy();
  await helloWorld.deployed();

  console.log("Hello World constract deployed at:", helloWorld.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
