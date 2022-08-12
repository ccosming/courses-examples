import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";

console.log(process.env.PRIVATE_KEY);

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      forking: {
        url: "https://bsc-dataseed.binance.org",
      },
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  typechain: {
    outDir: "../libs/typechain/src",
  },
};

export default config;
