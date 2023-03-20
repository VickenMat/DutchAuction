import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { assert } from "console";

describe("BasicDutchAuction Testing", function () {
  let seller: any;
  let account: any;
  let account2: any;
  let basicDutchAuctionToken: any;

  it("BasicDutchAuction Contract Deployment", async function () {
    const MintDutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
    const mintDutchAuction = await MintDutchAuctionFactory.deploy(100, 10, 10);
    basicDutchAuctionToken = await mintDutchAuction.deployed();
  });

  it("Should check if sellers balance is currently 0", async function () {
    expect(await basicDutchAuctionToken.balanceOf(seller)).to.equal(0);
  });
  
  it("Should check if initial price is 200 VToken", async function () {
    expect(await basicDutchAuctionToken.getCurrentPrice()).to.equal(200);
  });

  it("Should test bid functionality before approval", async function () {
    await expect(basicDutchAuctionToken.bid(450)).to.be.revertedWith("Owner cannot submit bid on own item");
  });

  it("Should test the bid functionality", async function () {
    await basicDutchAuctionToken.connect(account).bid(400);
  });

  // BasicDutchAuction---------------------------------------
  it('reserve price - 200 wei' , async function(){
    expect(await basicDutchAuctionToken.getReservePrice()).to.equal(100);
  });

  it('num blocks auction open for - 10' , async function(){
    expect(await basicDutchAuctionToken.getNumBlocksAuctionOpen()).to.equal(10);
  });

  it('offer price decrement - 10 wei' , async function(){
    expect(await basicDutchAuctionToken.getPriceDecrement()).to.equal(10);
  });
  
  it('is owner of this contract the seller', async function(){
    expect( await basicDutchAuctionToken.getSellerAddress()).to.equal(seller);
  });

  it("Checking to see if the seller received the wei", async function () {
    expect(await basicDutchAuctionToken.balanceOf(seller)).to.equal(await basicDutchAuctionToken.getCurrentPrice());
  });
});
