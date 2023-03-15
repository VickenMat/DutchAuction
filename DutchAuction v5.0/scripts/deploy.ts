import { ethers, upgrades } from "hardhat";

async function main() {
  const [nftDeployer, tokenDeployer, owner] = await ethers.getSigners();

  console.log("Minting VTokens to", tokenDeployer.address);
  console.log("Account balance:", (await tokenDeployer.getBalance()).toString());
  const Token = await ethers.getContractFactory("VToken");
  const token = await Token.deploy(5000);
  // token.mintERC20(token.address, 5000);

  console.log("Deploying contracts with the account", nftDeployer.address);
  console.log("Minting NFT to", nftDeployer.address);
  const NFT = await ethers.getContractFactory("MintNFT");
  const nft = await NFT.deploy(10);
  
  console.log("Deploying DutchAuction contract to", nftDeployer.address);
  const dutchAuction = await ethers.getContractFactory("NFTDutchAuction_ERC20Bids");
  const auction = await upgrades.deployProxy(
    dutchAuction,
    [token.address, nft.address, 0, 200, 50, 4],
    {
      kind: "uups",
      initializer: "initialize(address, address, uint256, uint256, uint256, uint256)"
    });

  console.log("VToken contract address:", token.address);
  console.log("NFTMint contract address:", nft.address);
  console.log("NFTDutchAuction contract address:", auction.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
