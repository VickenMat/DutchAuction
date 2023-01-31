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


describe("Lock", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const basicDutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
    const basicDutchAuctionToken = await basicDutchAuctionFactory.connect(owner).deploy(100, 10, 10);
    return { basicDutchAuctionToken, owner, otherAccount };
  }


describe("Deployment", function () {
    it("test", async function () {
      const { basicDutchAuctionToken, owner } = await loadFixture(deployOneYearLockFixture);
      expect(await basicDutchAuctionToken.getCurrentPrice()).to.equal(5000);
    });
});
});


/*
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
*/