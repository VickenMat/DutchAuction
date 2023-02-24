import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { assert } from "console";
// import { MintNFT } from "../typechain-types";
// import { NFTDutchAuction } from "../typechain-types/contracts/NFTDutchAuction";
import { Contract, Signer } from "ethers";

// testing  MintNFT contract
describe("VToken", () =>  {
  let MintERC20Factory: any;
  let mintERC20Token: any;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async () => {
    MintERC20Factory = await ethers.getContractFactory("VToken", owner);
    const maxSupply = 10000;
    [owner, addr1, addr2] = await ethers.getSigners();
    mintERC20Token = await MintERC20Factory.deploy(maxSupply);
    await mintERC20Token.deployed();
  });

  describe("Deployment", () => {
    it("Should set the correct name and symbol", async () => {
      expect(await mintERC20Token.name()).to.equal("VToken");
      expect(await mintERC20Token.symbol()).to.equal("VT");
    });

    it("Should set the max supply correctly", async () => {
      const maxSupply = 10000;
      expect(await mintERC20Token.maxSupply()).to.equal(maxSupply);
    });

    it("Should not allow max supply to be set to 0", async () => {
      const maxSupply = 0;
      await expect(mintERC20Token.connect(owner).deploy(maxSupply)).to.be.revertedWith(
        "Max token supply must be greater than 0"
      );
    });

    it("Should not allow max supply to be set to a number greater than 10,000", async () => {
      const maxSupply = 10001;
      await expect(mintERC20Token.connect(owner).deploy(maxSupply)).to.be.revertedWith(
        "Max token supply must be less than or equal to 10,000"
      );
    });
  });

  describe("Minting", () => {
    it("Should mint tokens to the specified address", async () => {
      const amount = 10;
      const balanceBefore = await mintERC20Token.balanceOf(await addr1.getAddress());
      await mintERC20Token.connect(owner).mintERC20Token(await addr1.getAddress(), amount);
      const balanceAfter = await mintERC20Token.balanceOf(await addr1.getAddress());
      expect(balanceAfter.sub(balanceBefore)).to.equal(amount);
    });

    it("Should not mint tokens if the total supply exceeds the max supply", async () => {
      const amount = 0;
      await expect(mintERC20Token.connect(owner).mintERC20Token(await addr1.getAddress(), amount)).to.be.revertedWith(
        "Number of tokens minted to this address plus tokens in circulation should be less than the max supply"
      );
    });
  });

  describe("Miner Rewards", () => {
    it("Should mint reward tokens to the miner's address", async () => {
      const balanceBefore = await mintERC20Token.balanceOf(await owner.getAddress());
      await mintERC20Token.connect(owner)._mintMinerReward();
      const balanceAfter = await mintERC20Token.balanceOf(await owner.getAddress());
      expect(balanceAfter.sub(balanceBefore)).to.equal(0);
    });
  });
});



describe("MintNFT", function () {
  let MintNFTFactory: any;
  let mintNFTToken: any;
  let owner: any;
  let addr1: any;

  beforeEach(async function () {
    MintNFTFactory = await ethers.getContractFactory("MintNFT");
    [owner, addr1] = await ethers.getSigners();
    mintNFTToken = await MintNFTFactory.deploy(10);
    await mintNFTToken.deployed();
  });

  describe("Max Supply", function () {
    it("should set max supply of nfts minted to 10(index 0-9)", async function () {
      expect(await mintNFTToken.maxSupply()).to.equal(10);
    });
  });

  describe("safeMint", function () {
    it("should mint 1 NFT to the owners address at index 0", async function () {
      const uri = "https://example.com/token/1";
      await mintNFTToken.safeMint(owner.address, uri);
      expect(await mintNFTToken.ownerOf(0)).to.equal(owner.address);
    });

    it("should not mint more tokens than the max supply", async function () {
      const uri = "testing uri";
      for (let i = 0; i < 10; i++) {
        await mintNFTToken.safeMint(owner.address, uri);
      }
      await expect(mintNFTToken.safeMint(owner.address, uri)).to.be.revertedWith(
        "Max number of tokens minted"
      );
    });
  });
  describe("tokenURI", function () {
    it("should return the URI of the given token", async function () {
      const uri = "https://example.com/nft";
      await mintNFTToken.safeMint(owner.address, uri);
      expect(await mintNFTToken.tokenURI(0)).to.equal(uri);
    });
  });
/*
  describe("_burn", function () {
    it("should burn an NFT", async function () {
      const uri = "https://example.com/nft";
      await mintNFTToken.safeMint(owner.address, uri);
      await mintNFTToken.burn(0);
      await expect(mintNFTToken.ownerOf(0)).to.be.revertedWith("ERC721: owner query for nonexistent token");
    });
  });
*/
});
describe("NFTDutchAuction", function () {
  async function deployDutchAuction() {
    // signers are objects that represent an ethereum account
    const [owner, account1, account2] = await ethers.getSigners();
    // ContractFactory is an abstraction used to deploy new smart contracts, so whatever is in " " is a factory for instances of our token contract
    const basicDutchAuctionFactory = await ethers.getContractFactory("NFTDutchAuction");
    // calling deploy() on a ContractFactory will start the deployment and return a promise that resovles to a contract
    // this is the object that has a method for each of your smart contract functions
    const basicDutchAuctionToken = await basicDutchAuctionFactory.connect(owner).deploy(owner.address, owner.address, 0, 200, 50, 4);
    // gets the balance of the owner account by calling balanceOf() method
    const ownerBalance  = await basicDutchAuctionToken.balanceOf(owner.address);
    // gets balance of 2 accounts
    const accountOneBalance = await basicDutchAuctionToken.balanceOf(account1.address);
    const accountTwoBalance = await basicDutchAuctionToken.balanceOf(account2.address);
    return { basicDutchAuctionToken, owner, account1, account2, accountOneBalance, accountTwoBalance};
  }
  describe("Checking Auction Values", function () {
  // await tells the compiler not to go line by line
  it('reserve price - 200 VToken' , async function(){
    const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
    expect(await basicDutchAuctionToken.getReservePrice()).to.equal(200);
  });

  it('num blocks auction open for - 50' , async function(){
    const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
    expect(await basicDutchAuctionToken.getNumBlocksAuctionOpen()).to.equal(50);
  });

  it('offer price decrement - 4 VToken' , async function(){
    const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
    expect(await basicDutchAuctionToken.getPriceDecrement()).to.equal(4);
  });

  it("checking if initial price is 400 VToken", async function () {
    const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
    expect(await basicDutchAuctionToken.getCurrentPrice()).to.equal(400);
  });
  });

  describe("Checking Seller", function () {
    it('is owner of this contract the seller', async function(){
      const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
      expect( await basicDutchAuctionToken.getSellerAddress()).to.equal(owner.address);
    });

    it('bid from seller account', async function(){
      const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
      expect( basicDutchAuctionToken.connect(owner).bid(400)).to.be.revertedWith("Owner cannot submit bid on own item");
    });
  });
    describe('Checking Bidders', function () {
        
        it('bidder owns more than 0 VToken', async function(){
          const { basicDutchAuctionToken, account1 } = await loadFixture(deployDutchAuction);
          expect( await basicDutchAuctionToken.balanceOf(account1.address)).to.greaterThan(ethers.utils.parseUnits("-1", 1)).to.be.revertedWith("Your accounts balance is not greater than 0");
        });
        
      
        it('bid accepted - 400 VToken - sufficient amount', async function(){
          const { basicDutchAuctionToken, account1 } = await loadFixture(deployDutchAuction);
          expect( basicDutchAuctionToken.connect(account1).bid(400));
        });
      
        it('bid rejected - 100 VToken - insufficient amount', async function(){
          const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
          expect( basicDutchAuctionToken.connect(owner).bid(100)).to.be.revertedWith("You have not bid sufficient funds");
        });

        it('multiple bids - first bid greater than current price, second bid lower', async function(){
          const { basicDutchAuctionToken, account1, account2 } = await loadFixture(deployDutchAuction);
          expect( basicDutchAuctionToken.connect(account1).bid({from: account1.address, value: 220}
        ));
        expect( basicDutchAuctionToken.connect(account2).bid({from: account2.address, value: 180}
          ));
        });
    
        it('multiple bids - both bids higher than current price', async function(){
          const { basicDutchAuctionToken, account1, account2 } = await loadFixture(deployDutchAuction);
          expect( basicDutchAuctionToken.connect(account1).bid({from: account1.address, value: 300}
            ));
          expect( basicDutchAuctionToken.connect(account2).bid({from: account2.address, value: 280}
            ));
        });
    });
  });



