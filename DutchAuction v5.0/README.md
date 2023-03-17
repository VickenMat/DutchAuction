(base) vicken@Vickens-MacBook-Air DutchAuction v5.0 % npx hardhat coverage

# Version

> solidity-coverage: v0.7.22

# Instrumenting for coverage...

> MintNFT.sol
> NFTDutchAuction_ERC20Bids.sol
> VToken.sol

# Compilation:

Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
--> contracts/NFTDutchAuction_ERC20Bids.sol:259:9:
|
259 | address newImplementation
| ^^^^^^^^^^^^^^^^^^^^^^^^^

Generating typings for: 37 artifacts in dir: typechain-types for target: ethers-v5
Successfully generated 100 typings!
Compiled 35 Solidity files successfully

# Network Info

> HardhatEVM: v2.13.0
> network: hardhat

Auction
✔ VToken Contract Deployment (160ms)
✔ Should set the correct name and symbol
Mints 5,000 VToken to 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
✔ Should mint 5,000 VTokens
✔ Should set the max supply correctly to 10,000
✔ Should not allow max supply to be set to 0
✔ Should not allow max supply to be greater than 10,000
✔ Should not mint tokens after max supply have been minted
✔ MintNFT Contract Deployment (61ms)
✔ Should set max supply of NFTs minted to 10(index 0-9)
✔ Should not mint more tokens than the max supply (341ms)
Mints NFT to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
✔ Should test NFT minting
✔ Should test safeMint from bidders account
NFTDutchAuction contract address is 0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE
MintNFT contract address is 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
VToken contract address is 0x5FbDB2315678afecb367f032d93F642f64180aa3
NFT owner/seller address is 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
VToken creator/bidder address is 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
✔ NFTDutchAuction Contract Deployment through Proxy (175ms)
✔ Should check if sellers balance is currently 0
✔ Should check if initial price is 400 VToken
MintNFT contract 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9 approving NFTDutchAuction contract 0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE from NFT seller 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
✔ Approval from NFTDutchAuction contract for bid
VToken contract 0x5FbDB2315678afecb367f032d93F642f64180aa3 approving NFTDutchAuction contract 0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE from VToken owner 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
✔ Approval from ERC20 contract for bid
0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 bid 450 VToken
✔ Should not allow bidding before contract approval
0x70997970c51812dc3a010c7d01b50e0d17dc79c8 bid 400 VToken
✔ Should test the bid functionality after approving (49ms)
✔ reserve price - 200 VToken
✔ num blocks auction open for - 50
✔ offer price decrement - 4 VToken
✔ is owner of this contract the seller
✔ Checking to see if the NFT seller received the VTokens
ERC20Permit Testing
✔ Checking token allowance

25 passing (1s)

--------------------------------|----------|----------|----------|----------|----------------|
File | % Stmts | % Branch | % Funcs | % Lines |Uncovered Lines |
--------------------------------|----------|----------|----------|----------|----------------|
contracts/ | 100 | 70.83 | 91.67 | 100 | |
MintNFT.sol | 100 | 66.67 | 100 | 100 | |
NFTDutchAuction_ERC20Bids.sol | 100 | 58.33 | 87.5 | 100 | |
VToken.sol | 100 | 100 | 100 | 100 | |
--------------------------------|----------|----------|----------|----------|----------------|
All files | 100 | 70.83 | 91.67 | 100 | |
--------------------------------|----------|----------|----------|----------|----------------|

> Istanbul reports written to ./coverage/ and ./coverage.json
