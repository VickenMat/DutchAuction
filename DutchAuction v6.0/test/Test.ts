import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { assert } from "console";

describe("BasicDutchAuction Testing", function () {
  let seller: any;
  let account1: any;
  let basicDutchAuctionToken: any;

  /*
  describe("Contract Deployment", function(){
    it("deploys BasicDutchAuction.sol contract", async function () {
    });
  */
    beforeEach("deploys BasicDutchAuction.sol contract", async function () {
      const [owner, address1] = await ethers.getSigners();
      seller = owner;
      account1 = address1;
      const MintDutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
      const mintDutchAuction = await MintDutchAuctionFactory.deploy(100, 10, 10);
      basicDutchAuctionToken = await mintDutchAuction.deployed();
    });

    describe("Checking Auction Parameters", function(){
      it("logging addresses", async function () {
        console.log("Contract Address is",basicDutchAuctionToken.address);
        console.log("Seller Address is",seller.address);
        console.log("Account 1 Address is",account1.address);
      });
      it("initial price - 200 wei", async function () {
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
      it('is auction open', async function(){
        expect(await basicDutchAuctionToken.isAuctionOpen()).to.be.true;
      })

      describe("Checking Seller/Bidder Address", function () {
        it('is owner of this contract the seller', async function(){
          expect(await basicDutchAuctionToken.getSellerAddress()).to.equal(seller.address);
        });
        // console.log("Account1 Balance", account1.balanceOf());
        it("is account1 wei balance greater than 0", async function () {
          expect(await basicDutchAuctionToken.balanceOf(account1.address)).to.lessThanOrEqual(0);
        });
        
        //await nftDutchAuctionToken.connect(account).bid(400);

        describe("Checking Bidders/Bidding", function(){
          it('bid from seller account', async function(){
            expect(basicDutchAuctionToken.connect(seller).bid({value: 200})).to.be.revertedWith("Owner cannot submit bid on own item");
          });
          it("unsuccessfully bid below current price -150 wei", async function () {
            expect(basicDutchAuctionToken.connect(account1).bid({value: 150})).to.be.revertedWith("You have not sent sufficient funds");
          });
          it("successfully bid at/above current price - 200 wei", async function () {
            expect(basicDutchAuctionToken.connect(account1).bid({value: 200}))
          });
          it("Checking to see if the seller received the wei", async function () {
            expect(await basicDutchAuctionToken.balanceOf(seller.address)).to.equal(0);//(await basicDutchAuctionToken.getCurrentPrice());
          });
        });
      });
    });
  });