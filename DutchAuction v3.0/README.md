# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

# Version

> solidity-coverage: v0.8.2

# Instrumenting for coverage...

> MintNFT.sol
> NFTDutchAuction_ERC20Bids.sol
> VToken.sol

# Compilation:

Generating typings for: 3 artifacts in dir: typechain-types for target: ethers-v5
Successfully generated 52 typings!
Compiled 1 Solidity file successfully

# Network Info

> HardhatEVM: v2.12.7
> network: hardhat

Auction
✔ VToken Contract Deployment (126ms)
✔ Should set the correct name and symbol
✔ Should mint 5,000 VTokens
✔ Should set the max supply correctly to 10,000
✔ Should not allow max supply to be set to 0
✔ Should not allow max supply to be greater than 10,000
✔ Should not mint tokens after max supply have been minted
✔ MintNFT Contract Deployment
✔ Should set max supply of nfts minted to 10(index 0-9)
✔ should not mint more tokens than the max supply (199ms)
✔ tests nft minting
✔ testing safeMint for bidders account
✔ NFTDutchAuction Contract Deployment (50ms)
✔ en
✔ checking if initial price is 400 VToken
✔ taking approval from nft contract for bid
✔ taking approval from erc20 contract for bid
0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 has bid 450 VToken
✔ testing the bid functionality before approval
0x70997970c51812dc3a010c7d01b50e0d17dc79c8 has bid 400 VToken
Owners address 0x70997970c51812dc3a010c7d01b50e0d17dc79c8
✔ testing the bid functionality
✔ reserve price - 200 VToken
✔ num blocks auction open for - 50
✔ offer price decrement - 4 VToken
Sellers address 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
✔ is owner of this contract the seller
✔ Checking to see if the NFT seller received the VTokens

24 passing (622ms)

--------------------------------|----------|----------|----------|----------|----------------|
File | % Stmts | % Branch | % Funcs | % Lines |Uncovered Lines |
--------------------------------|----------|----------|----------|----------|----------------|
contracts/ | 96.55 | 57.69 | 100 | 97.78 | |
MintNFT.sol | 100 | 66.67 | 100 | 100 | |
NFTDutchAuction_ERC20Bids.sol | 100 | 58.33 | 100 | 100 | |
VToken.sol | 83.33 | 50 | 100 | 85.71 | 30 |
--------------------------------|----------|----------|----------|----------|----------------|
All files | 96.55 | 57.69 | 100 | 97.78 | |
--------------------------------|----------|----------|----------|----------|----------------|
