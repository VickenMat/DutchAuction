/*

// 'npm run test' in terminal

const assert = require('assert');
// ganache hosts a local test network
const ganache = require('ganache-cli');
// uppercase because constructor used to make instances of thw Web3 library - only make referenece to this one time
// portal to the Ethereum world
const Web3 = require('web3');
// instance of web3 and tells it to connect to a test network we created on our machine
// when connecting to other networks, we will replace ganache.provider() with what we want
// must have provider
const web3 = new Web3(ganache.provider());
// gives us the definition of what a contract is
const { abi, evm } = require('../compile');

// account to deploy contract
let accounts;
let inbox;
const text = 'Hi there';
// to use await, you need to make sure the function is async 
// await is better syntax than promises
beforeEach(async () => {
    // get a list of all accounts
    // all 10 accounts are unlocked so we can send money, call a function, etc
    accounts = await web3.eth.getAccounts()
        // returns a promise
        //.then(fetchedAccounts => {
        //    console.log(fetchedAccounts);
        //});
        
    // teaches web3 about what methods an inbox contract has
    inbox = await new web3.eth.Contract(abi)    // generic contract object, customized with methods below
        // tells web3 that we want to deploy a new copy of this contract
        .deploy({ data: '0x' + evm.bytecode.object, arguments: [text] })     // tx object
        // instructs web3 to send out a tx that creates this contract
        .send({ from: accounts[0], gas: '1000000'})     // actually triggers communication from web3 to network
});

// use one of those accounts to deploy a contract
describe('Inbox', () => {
    it('deploys a contract', () => {
        // console.log(accounts);
        // console.log(inbox);
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        // inbox = reference contract
        // methods is an object that contains all of the public functions that exist in our contract
        // message() = customize list of args passed to fn
        // call() = customize exactly how fn is called
        const message = await inbox.methods.message().call();
        assert.equal(message, text);
    });

    it('can change the message', async () => {
        // .methods gives us the ability to change or retrieve data from our contract
        // .send is sending the tx to the network since were changing data
        // from accounts[0] is saying the the 1st account is going to pay for this tx
        await inbox.methods.setMessage('new message').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'new message');
    });
});


/*
class Car {
    park(){
        return 'stopped';
    }

    drive(){
        return 'vroom';
    }
}

// initialize the variable car for the scope of this project
let car;
// common initialization code for multiple tests
// initializes the car variable to a new Car object
beforeEach(() => {
    car = new Car();
});

// 'Car' can be anything, doesn't have to be name of class
describe('Car', () => {
    it('can park', () => {
        // const car = new Car();
        // 'stopped' is the value we think it should be
        assert.equal(car.park(), 'stopped');
    });
    it('can drive', () => {
        // const car = new Car();
        // 'vroom' is the value we think it should be
        assert.equal(car.drive(), 'vroom');
    });
});
*/

