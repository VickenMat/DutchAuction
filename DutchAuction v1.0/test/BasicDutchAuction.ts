import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { assert } from "console";


describe("Deploying Contract", function () {

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
  }
  // await tells the compiler not to go line by line
  it('reserve price - 100 wei' , async function(){
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

  it("checking if initial price is 200 wei", async function () {
    const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
    expect(await basicDutchAuctionToken.getCurrentPrice()).to.equal(200);
  });
  describe("Checking Seller", function () {
    
    // needs work
    it('is owner of this contract the seller', async function(){
      const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
      expect( await basicDutchAuctionToken.getSellerAddress());
    });

    it('seller - bidding on own item', async function(){
      const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
      expect( basicDutchAuctionToken.connect(owner).bid({from: owner.address, value: 200}
        ));
    });
    it('bid from owner account', async function(){
      const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
      expect( basicDutchAuctionToken.connect(owner).bid({value: 200})).to.be.revertedWith("Owner cannot submit bid on own item");
        
    });

    describe('Checking Bidders', function () {
      it('checks if bidder has more than 0 wei', async function(){
        const { basicDutchAuctionToken, account1 } = await loadFixture(deployDutchAuction);
        expect( basicDutchAuctionToken.balanceOf(account1.address));
      });
    
      it('bid accepted - sufficient amount', async function(){
    
      });
    
      it('bid rejected - insufficient amount', async function(){
    
      });
  
      it('bidding 200 wei - successful bid', async function(){
        const { basicDutchAuctionToken, account1 } = await loadFixture(deployDutchAuction);
        expect( basicDutchAuctionToken.connect(account1).bid({from: account1.address, value: 200}
          ));
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

      it('check for winner', async function(){
        const { basicDutchAuctionToken, owner } = await loadFixture(deployDutchAuction);
        expect( basicDutchAuctionToken.getWinner());
      });

      it('auction ended - winner already chosen', async function(){
        const { basicDutchAuctionToken, account1, account2 } = await loadFixture(deployDutchAuction);
        const winner = account1;
        // expect(basicDutchAuctionToken.connect(account1).bid({from: account1.address, value: 200},
        // ))
  
        expect(basicDutchAuctionToken.connect(account2).bid({from: account2.address, value: 220}
        ));
      });

      it('auction ended - reject bid because select number of blocks passed', async function(){
      
      });


      it('refund losing bids', async function(){
        const { basicDutchAuctionToken, account2 } = await loadFixture(deployDutchAuction);
        expect( basicDutchAuctionToken.connect(account2).refund(10
          ));
      });

      it('seller balance - increases', async function(){
  
      });
    
      it('buyer balance - decreases', async function(){
    
      });

    });
  });
});