This project creates a Dutch Auction in which the seller instantiates a contract to manage the auction of a single item at a single auction event. The seller is the owner of the contract and the auction begins at the block in which the contract is created. Bids can be submitted by an externally owned Ethereum account. The first bid processed by the contract that sends wei greater than or equal to the current price is the winner. The wei should be transferred immediately to the seller and the contract should not accept any more bids. All bids besides the winning bid will be refunded immediately.

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
