import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { assert } from "console";


describe("Deployment", function () {
  async function deployDutchAuction() {
    // signers are objects that represent an ethereum account
    const [owner, account1, account2] = await ethers.getSigners();
    // ContractFactory is an abstraction used to deploy new smart contracts, so whatever is in " " is a factory for instances of our token contract
    const basicDutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
    // calling deploy() on a ContractFactory will start the deployment and return a promise that resovles to a contract
    // this is the object that has a method for each of your smart contract functions
    const basicDutchAuctionToken = await basicDutchAuctionFactory.connect(owner).deploy(100, 10, 10);
    // gets the balance of the owner account by calling balanceOf() method
    const ownerBalance  = await basicDutchAuctionToken.balanceOf(owner.address);
    // gets balance of 2 accounts
    const accountOneBalance = await basicDutchAuctionToken.balanceOf(account1.address);
    const accountTwoBalance = await basicDutchAuctionToken.balanceOf(account2.address);
    return { basicDutchAuctionToken, owner, account1, account2 };
  //}
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
}



describe("Test Cases", function () {
    it("checking if initial price is 200 wei", async function () {
      const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
      expect(await basicDutchAuctionToken.getCurrentPrice()).to.equal(200);
    });

    it('is owner if this contract the seller', async function(){
      const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
      expect(await basicDutchAuctionToken.getSellerAddress());
    });

    it('seller - bidding on own item', async function(){
      const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
      expect(await basicDutchAuctionToken.connect(owner).bid({from: owner.address, value: 200}
        ));
    });

    it('checks if first bidder has more than 0 wei', async function(){
      const { basicDutchAuctionToken, account1 } = await loadFixture(deployDutchAuction);
      expect(await basicDutchAuctionToken.balanceOf(account1.address));
    });
/*
    it('bidder - successful bid', async function(){
      const { basicDutchAuctionToken, account1 } = await loadFixture(deployDutchAuction);
      expect(await basicDutchAuctionToken.connect(account1).bid({from: account1.address, value: 200}
        ));
      await basicDutchAuctionToken.transfer(account1.address, 200);
    });
*/


  
    it('auction ended - winner already chosen', async function(){
      const { basicDutchAuctionToken, account2 } = await loadFixture(deployDutchAuction);
      expect(await basicDutchAuctionToken.connect(account2).bid({from: account2.address, value: 220}
        ));
    });
  
    it('check for winner', async function(){
      const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
      expect(await basicDutchAuctionToken.getWinner());
    });

    it('auction ended - reject bid because select number of blocks passed', async function(){
      
    });
  
    it('bid accepted - sufficient amount', async function(){
  
    });
  
    it('bid rejected - insufficient amount', async function(){
  
    });
  
    it('multiple bids - first greater than current price, second lower', async function(){
      const { basicDutchAuctionToken, account1, account2 } = await loadFixture(deployDutchAuction);
      expect(await basicDutchAuctionToken.connect(account1).bid({from: account1.address, value: 200}
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