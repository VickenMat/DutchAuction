Vicken Matiossian - INFO 7500 - Smart Contract Engineering

This project allows the user to mint a certain amount of NFT's, then create an Dutch Auction in which the seller instantiates a contract to manage the auction of a single NFT. The seller is the owner of the Mint and Auction contract. The auction begins at the block in which the contract is created. Bids can be submitted by an externally owned Ethereum account. The first bid processed by the contract that sends wei greater than or equal to the current price is the winner. The NFT at a certain index and amount of wei spent on the auction is transferred immediately to the buyer and seller respectively. The contract will be closed and not accept any more bids.

```shell
npx hardhat compile
npx hardhat test
npx hardhat coverage
--
npx hardhat help
npx hardhat node
npx hardhat run scripts/deploy.ts
```

