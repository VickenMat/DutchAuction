import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { assert } from "console";
// import { MintNFT } from "../typechain-types";
// import { NFTDutchAuction } from "../typechain-types/contracts/NFTDutchAuction";
import { Contract, Signer } from "ethers";
import { contracts } from "../typechain-types";


describe("Auction", function () {
  let seller: any;
  let account: any;

  let erc20ContractCreator: any;
  let mintERC20Token: any;

  let mintNFTToken: any;
  let nftContractCreator: any;
  
  let nftDutchAuctionContract: any;

// testing  MintNFT contract
  it("VToken Contract Deployment", async function ()  {
    const [owner, address1] = await ethers.getSigners();
    seller = owner;
    account = address1;
    const MintERC20Factory = await ethers.getContractFactory("VToken");
    erc20ContractCreator = await MintERC20Factory.deploy(10000);
    mintERC20Token = await erc20ContractCreator.deployed();
  });

  it("tests erc20 minting", async function () {
    expect(mintERC20Token.mintERC20Token(seller.address, 10000));
  });
  it("testing if contract will mint tokens after we reach max supply", async function () {
    expect(mintERC20Token.mintERC20Token(seller.address, 10000)).to.be.revertedWith("Number of tokens minted to this address should be less than the max supply");
  });


// testing  NFTDutchAuction_ERC20Bids contract
  it("MintNFT Contract Deployment", async function ()  {
    const [owner, address1] = await ethers.getSigners();
    seller = owner;
    account = address1;
    const MintDutchAuctionFactory = await ethers.getContractFactory("MintNFT");
    nftContractCreator = await MintDutchAuctionFactory.deploy(10);
    mintNFTToken = await nftContractCreator.deployed();
  });
    it("tests nft minting", async function () {
      await expect(mintNFTToken.safeMint(seller.address));
    });
  
    it("testing safeMint for bidders account", async function ()  {
      await expect(mintNFTToken.connect(account).safeMint(account.address));
    });

  it("NFTDutchAuction Contract Deployment", async function () {
    const MintDutchAuctionFactory = await ethers.getContractFactory("NFTDutchAuction_ERC20Bids");
    const mintNFTDutchAuction = await MintDutchAuctionFactory.deploy(mintERC20Token.address, mintNFTToken.address, 0, 200, 50, 4);
    nftDutchAuctionContract = await mintNFTDutchAuction.deployed();
  });

  // approve
  it("testing the bid functionality before approval", async function () {
    await expect(nftDutchAuctionContract.bid(450)).to.be.revertedWith("Owner cannot submit bid on own item");
  });

  it("taking approval from nft contract for bid", async function () {
    await mintNFTToken.approve(nftDutchAuctionContract.address, 0);
  });

  it("taking approval from erc20 contract for bid", async function () {
    await mintERC20Token.connect(account).approve(nftDutchAuctionContract.address, 0);
  });

  it("testing the bid functionality", async function () {
    await nftDutchAuctionContract.connect(account).bid(200);
  });

  it("testing the max supply for erc20 tokens", async function () {
    const totalSupply = await mintERC20Token.getMaxSupply();
    it("Testing the erc20 mint functionality", async function () {
      expect(await mintERC20Token.mintERC20Token(seller.address, 410));
    });
  });
});






  
