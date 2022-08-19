import { ethers } from "hardhat";

async function main() {
  console.log("Deploying...");

  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const contract = await HelloWorld.deploy();
  await contract.deployed();

  console.log("Hello World constract deployed at:", contract.address);

  const Token = await ethers.getContractFactory("CTOKToken");
  const initialSupply = ethers.utils.parseUnits("200", 18);
  const tokenContract = await Token.deploy(initialSupply);
  await tokenContract.deployed();

  console.log("Token contract deployed at:", tokenContract.address);

  const DI = await ethers.getContractFactory("DigitalIdentity");
  const diContract = await DI.deploy();
  await diContract.deployed();

  console.log("Digital Identity contract deployed at:", diContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
