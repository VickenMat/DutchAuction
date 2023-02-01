import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Deploy", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const basicDutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
    const basicDutchAuctionToken = await basicDutchAuctionFactory.connect(owner).deploy(100, 10, 10);
    return { basicDutchAuctionToken, owner, otherAccount };
  }
describe("Test Cases", function () {
    it("checking if price is equal to 200", async function () {
      const { basicDutchAuctionToken, owner } = await loadFixture(deployOneYearLockFixture);
      expect(await basicDutchAuctionToken.getCurrentPrice()).to.equal(200);
    });

    it('is seller owner of this contract', async function(){
      const { basicDutchAuctionToken, owner } = await loadFixture(deployOneYearLockFixture);
      expect(await basicDutchAuctionToken.connect(owner).bid({from: owner.address, value: 200}
        ));
    });

    it('bidder - successful bid', async function(){
      const { basicDutchAuctionToken, otherAccount } = await loadFixture(deployOneYearLockFixture);
      expect(await basicDutchAuctionToken.connect(otherAccount).bid({from: otherAccount.address, value: 200}
        ));
    });
  
    it('seller - bidding on own item', async function(){
      const { basicDutchAuctionToken, owner } = await loadFixture(deployOneYearLockFixture);
      expect(await basicDutchAuctionToken.connect(owner).bid({from: owner.address, value: 200}
        ));
    });
  
    it('auction ended - winner already chosen', async function(){
      const { basicDutchAuctionToken, otherAccount } = await loadFixture(deployOneYearLockFixture);
      expect(await basicDutchAuctionToken.connect(otherAccount).bid({from: otherAccount.address, value: 220}
        ));
    });
  
    it('auction ended - reject bid because select number of blocks passed', async function(){
  
    });
  
    it('bid accepted - sufficient amount', async function(){
  
    });
  
    it('bid rejected - insufficient amount', async function(){
  
    });
  
    it('multiple bids - first greater than current price, second lower', async function(){
      const { basicDutchAuctionToken, otherAccount } = await loadFixture(deployOneYearLockFixture);
      expect(await basicDutchAuctionToken.connect(otherAccount).bid({from: otherAccount.address, value: 200}
        ));
    });
  
    it('multiple bids - both higher than current price', async function(){
  
    });
  
    it('seller balance - increases', async function(){
  
    });
  
    it('buyer balance - decreases', async function(){
  
    });
  
    it('refund losing bids', async function(){
  
    });
  
  });
});