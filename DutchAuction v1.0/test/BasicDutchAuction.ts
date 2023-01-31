import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import hre, { artifacts, ethers } from 'hardhat'
import { expect } from 'chai'
import { Contract } from "ethers";
import '@nomiclabs/hardhat-ethers'
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

// npx hardhat test 
import assert from 'assert';
// import { compiledContract } from '../scripts/compile';
import Web3 from 'web3';

// local test network that is created when we start running our tests
const ganache = require('ganache-cli');
// provider allows us to connect to a given network, change ganache to something else when ready
const provider = ganache.provider();
// set up instance of web3
const web3 = new Web3(provider);

// require an interface
// ****THIS IS WHATS CAUSING THE PROBLEM - Cannot read properties of undefined(reading ...)****
// const { abi, evm } = compiledContract;
// const { abi, evm } = require('../scripts/compile');
// let abi = require('../scripts/compile.ts');

const auction1 = {
  reservePrice: '100',
  numBlocksAuctionOpen: '10',
  offerPriceDecrement: '10'
};

let BasicDutchAuction: Contract;
// let owner: SignerWithAddress;
// let bidder: SignerWithAddress;
let accounts: string[];
let auction: any;

beforeEach(async () => {

  // get list of all accounts
  accounts = await web3.eth.getAccounts();
  // use first account to deploy the contract
  // auction = await new web3.eth.Contract(abi)

  // auction = (await new web3.eth.Contract(abi)
  //  .deploy({ data: '0x' + evm.bytecode.object, })
  //  .send({
  //    from: accounts[0], gas: 1000000,
  //  }));
  
  // const DutchAuctionFactory = 
  // await ethers.getContractFactory('Dutch Auction');
});

// deploying contract
/*
const run = require('../contracts/BasicDutchAuction.sol');
describe('Dutch Auction Contract', () => {
  it('creates a dutch auction', function (done) {
    run(accounts, done, {
      type: "dutch",
      reservePrice: 100,
      judgeAddress: 0x0000000000000000000000000000000000000000,
      biddingTimePeriod: 10,
      offerPriceDecrement: 10,
      actions: [],
    });
  });
});
*/



// setting up the parameters of the contract
describe("Setting up auction", function () {

  it('seller owner of contract', async function(){

  });

  it('setting auction parameters', async function(){

  });
  
});

// testing contract functionality
describe("Testing functionality", function () {

  it('seller - owner of the contract', async function(){

  });

  it('seller - bidding on own item', async function(){

  });

  it('auction ended - winner already chosen', async function(){

  });

  it('auction ended - reject bid because select number of blocks passed', async function(){

  });

  it('bid accepted - sufficient amount', async function(){

  });

  it('bid rejected - insufficient amount', async function(){

  });

  it('multiple bids - first greater than current price, second lower', async function(){

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






/*
    it('we should transfer the amount', async function(){
      const{ token, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);
      await token.transfer(otherAccount.address, 1000);
      // checking to see if the owner has 4000 tokens after sending 1000
      expect(await token.balances(owner.address)).to.equal(4000);
      // checking to see if the owner has 1000 tokens after receiving 1000
      expect(await token.balances(otherAccount.address)).to.equal(1000);
    });
    
  });







  

// when called, it will increase the EVM internal timestamp 10 seconds ahead of the current time
// after that, if you specify it, it will also mine a block to create a tx
// next time your contract will be called, the block.timestamp should be updated
// https://stermi.medium.com/how-to-create-tests-for-your-solidity-smart-contract-9fbbc4f0a319
it('simulating blockchain mining', function () {
  const increaseWorldTimeInSeconds = async (seconds: any, mine = false) => {
    await ethers.provider.send('evm_increaseTime', [seconds]);
    if(mine) {
      await ethers.provider.send('evm_mine', []);
    }
  }
});

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
  };
});
*/