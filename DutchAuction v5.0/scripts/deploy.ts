import { ethers, upgrades } from "hardhat";

async function main() {
  const [nftDeployer, tokenDeployer, owner] = await ethers.getSigners();

  console.log("Minting VTokens to", tokenDeployer.address);
  console.log("Account balance:", (await tokenDeployer.getBalance()).toString());
  const Token = await ethers.getContractFactory("VToken");
  const token = await Token.deploy(5000);

  console.log("Deploying contracts with the account", nftDeployer.address);
  console.log("Minting NFT to", nftDeployer.address);
  const NFT = await ethers.getContractFactory("MintNFT");
  const nft = await NFT.deploy(10);
  
  console.log("Deploying DutchAuction contract to", nftDeployer.address);
  const dutchAuction = await ethers.getContractFactory("NFTDutchAuction_ERC20Bids");
  const mintNFTDutchAuction = await upgrades.deployProxy(
    dutchAuction,
    [token.address, nft.address, 0, 200, 50, 4],
    {
      kind: "uups",
      initializer: "initialize(address, address, uint256, uint256, uint256, uint256)"
    });

  console.log("VToken contract address:", token.address);
  console.log("NFTMint contract address:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/*
async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.utils.parseEther("0.001");

  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(
    `Lock with ${ethers.utils.formatEther(lockedAmount)}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
*/
