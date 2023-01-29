import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import hre, { ethers } from 'hardhat'
import { expect } from 'chai'
import { Contract } from "ethers";
import '@nomiclabs/hardhat-ethers'

// npx hardhat test 

describe("Basic Dutch Auction", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBasicDutchAuctionFixture() {
    // returns an array of 20 account addresses and private keys
    const [owner, otherAccount] = await ethers.getSigners();

    const tokenFactory = await ethers.getContractFactory("BasicDutchAuction");
    // use owner private key to sign the tx
    const token = await tokenFactory.deploy(5000, 10, 500);

    return { token, owner, otherAccount };
  }

  describe("Token Deployment", function () {

    it('Bidding test', async function(){

    });
    it('we should transfer the amount', async function(){
      const{ token, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);
      await token.transfer(otherAccount.address, 1000);
      // checking to see if the owner has 4000 tokens after sending 1000
      expect(await token.balances(owner.address)).to.equal(4000);
      // checking to see if the owner has 1000 tokens after receiving 1000
      expect(await token.balances(otherAccount.address)).to.equal(1000);
    });
  });
  
});
