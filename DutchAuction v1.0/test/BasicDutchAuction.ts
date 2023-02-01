import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { assert } from "console";

describe("Deploy", function () {
  async function deployDutchAuction() {
    const [owner, otherAccount] = await ethers.getSigners();
    const basicDutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
    const basicDutchAuctionToken = await basicDutchAuctionFactory.connect(owner).deploy(100, 10, 10);
    return { basicDutchAuctionToken, owner, otherAccount };
  }

  it('reserve price - 200 wei' , async function(){
    const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
    expect(await basicDutchAuctionToken.getReservePrice()).to.equal(100);
  });

  it('num blocks auction open for - 10' , async function(){
    const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
    expect(await basicDutchAuctionToken.getNumBlocksAuctionOpen()).to.equal(10);
  });

  it('offer price decrement - 10 wei' , async function(){
    const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
    expect(await basicDutchAuctionToken.getPriceDecrement()).to.equal(10);
  });


describe("Test Cases", function () {
    it("checking if initial price is equal to 200 wei", async function () {
      const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
      expect(await basicDutchAuctionToken.getCurrentPrice()).to.equal(200);
    });

    it('is owner if this contract the seller', async function(){
      const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
      expect(await basicDutchAuctionToken.getSellerAddress(owner.address));
    });

    it('seller - bidding on own item', async function(){
      const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
      expect(await basicDutchAuctionToken.connect(owner).bid({from: owner.address[0], value: 200}
        ));
    });

    it('bidder - successful bid', async function(){
      const { basicDutchAuctionToken, otherAccount } = await loadFixture(deployDutchAuction);
      expect(await basicDutchAuctionToken.connect(otherAccount).bid({from: otherAccount.address[1], value: 200}
        ));
    });
  
    it('auction ended - winner already chosen', async function(){
      const { basicDutchAuctionToken, otherAccount } = await loadFixture(deployDutchAuction);
      expect(await basicDutchAuctionToken.connect(otherAccount).bid({from: otherAccount.address[2], value: 220}
        ));
    });
  
    it('auction ended - reject bid because select number of blocks passed', async function(){
      
    });
  
    it('bid accepted - sufficient amount', async function(){
  
    });
  
    it('bid rejected - insufficient amount', async function(){
  
    });
  
    it('multiple bids - first greater than current price, second lower', async function(){
      const { basicDutchAuctionToken, otherAccount } = await loadFixture(deployDutchAuction);
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