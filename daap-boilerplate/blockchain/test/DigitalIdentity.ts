import { expect } from "chai";
import { ethers } from "hardhat";
import { DigitalIdentity } from "../typechain-types";

describe("DigitalIdentity", function () {
  let contract: any;
  let digitalIdentity: DigitalIdentity;

  beforeEach(async function () {
    contract = await ethers.getContractFactory("DigitalIdentity");
    digitalIdentity = await contract.deploy();
  });

  describe("Deployment", function () {
    it("Should add new persons", async function () {
      await digitalIdentity.addPerson("Michael", "Jordan", 53);
      await digitalIdentity.addPerson("Scottie", "Pippen", 51);

      // Register count.
      const count = await digitalIdentity.getPersonsCount();

      // Getting persons.
      const michael = await digitalIdentity.getPerson(0);
      const scottie = await digitalIdentity.getPerson(1);

      // Verifying.
      expect(count.toNumber()).to.equal(2);
      expect(michael.name).to.equal("Michael");
      expect(scottie.name).to.equal("Scottie");
    });
  });
});
