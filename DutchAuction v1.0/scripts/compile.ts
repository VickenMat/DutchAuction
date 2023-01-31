import fs from 'fs';
import path from 'path';

const solc = require('solc');

const auctionPath = path.resolve(__dirname, '../', 'contracts', 'BasicDutchAuction.sol');

const source = fs.readFileSync(auctionPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'BasicDutchAuction.sol': {
            content: source, 
        },
    },
    settings: {
        metadata: {
            useLiteralContent: true,
        },
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(JSON.stringify(output, undefined, 4));
export const compiledContract = output.contracts['BasicDutchAuction.sol'].Auction;