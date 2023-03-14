/*
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    'scare diary later practice toast dress liquid visual sorry kitchen debris say',
    'https://goerli.infura.io/v3/a0d4d23faaca4ca1b0e7ab55fc77ed6c'
)
// takes provider and passes it to Web3 constructor
// get an instance of web3 enabled for Goerli
// this instance of web3 can be used to interact with the test network in any way we want
// can use to send eth, deploy/update contracts...
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account:', accounts[0]);

    const result = await new web3.eth.Contract(abi) 
        .deploy({ data: '0x' + evm.bytecode.object, arguments: ['Hello'] })
        .send({ from: accounts[0], gas: '1000000'});

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};

deploy();
*/