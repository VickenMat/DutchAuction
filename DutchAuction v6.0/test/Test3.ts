import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { assert } from "console";

describe("BasicDutchAuction Testing", function () {
  let seller: any;
  let account1: any;
  let account2: any;
  let basicDutchAuctionToken: any;

  describe("Contract Deployment", function(){
    it("Should deploy BasicDutchAuction.sol contract", async function () {
      const [seller, account1, account2] = await ethers.getSigners();
      const MintDutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
      const mintDutchAuction = await MintDutchAuctionFactory.deploy(100, 10, 10);
      basicDutchAuctionToken = await mintDutchAuction.deployed();
      console.log("Contract Address is",basicDutchAuctionToken.address);
      console.log("Seller Address is",seller.address);
      console.log("Account 1 Address is",account1.address);
      console.log("Account 2 Address is",account2.address);
    });

    describe("Checking Auction Parameters", function(){
      it("Should check if initial price is 200 wei", async function () {
        expect(await basicDutchAuctionToken.getCurrentPrice()).to.equal(200);
      });
      it('reserve price - 100 wei' , async function(){
        expect(await basicDutchAuctionToken.getReservePrice()).to.equal(100);
      });
    
      it('num blocks auction open for - 10' , async function(){
        expect(await basicDutchAuctionToken.getNumBlocksAuctionOpen()).to.equal(10);
      });
    
      it('offer price decrement - 10 wei' , async function(){
        expect(await basicDutchAuctionToken.getPriceDecrement()).to.equal(10);
      });

      describe("Checking Seller", function () {
        it("Should check if sellers balance is currently 0", async function () {
          expect(await basicDutchAuctionToken.balanceOf(seller)).to.lessThanOrEqual(0);
        });
        it('is owner of this contract the seller', async function(){
          expect( await basicDutchAuctionToken.getSellerAddress()).to.equal(seller.address);
        });

        describe("Checking Bidders/Bidding", function(){
          it("Should test bid functionality before approval", async function () {
            await expect(basicDutchAuctionToken.bid(450)).to.be.revertedWith("Owner cannot submit bid on own item");
          });
          it("Should test the bid functionality", async function () {
            await basicDutchAuctionToken.connect(account1).bid(400);
          });
          it("Checking to see if the seller received the wei", async function () {
            expect(await basicDutchAuctionToken.balanceOf(seller)).to.equal(await basicDutchAuctionToken.getCurrentPrice());
          });
        });
      });
    });
  });
});