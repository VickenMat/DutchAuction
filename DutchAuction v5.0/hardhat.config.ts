import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
};

const ALCHEMY_API_KEY = "lYXBWkGiy2LjhgL5gm-phhEjR63nhqAw";

const GOERLI_PRIVATE_KEY = "428150b0d349037985428ba1da0d8bfb930403a58cf8c2ed875470e6df1791c4";

module.exports = {
  solidity: "0.8.18",
  networks:{
    goerli:{
      url: 'https://eth-goerli.g.alchemy.com/v2/lYXBWkGiy2LjhgL5gm-phhEjR63nhqAw',
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};

export default config;
