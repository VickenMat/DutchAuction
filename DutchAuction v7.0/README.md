DutchAuction v7.0

http://k51qzi5uqu5dkb41dqtct70lc1g0n9s4qo7tugkx473jh6i5ko115bjun5989r.ipns.localhost:8080/

Version 7 connects the contract to IPFS and allows for bidding with the Sepolia and Goerli testnet

(base) vicken@Vickens-MacBook-Air DutchAuction v6.0 % yarn hardhat compile
yarn run v1.22.19
$ '/Users/vicken/Desktop/Solidity Projects/GitHub Dutch Auction/DutchAuction v6.0/node_modules/.bin/hardhat' compile
Nothing to compile
No need to generate any newer typings.
✨ Done in 0.80s.

BasicDutchAuction Testing
Checking Auction Parameters
BasicDutchAuction Contract Address - 0x5FbDB2315678afecb367f032d93F642f64180aa3
Seller Address - 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Winning Bidder(Account 1) Address - 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
2nd Bidder(Account 2) Address - 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
✔ console logging addresses
✔ initial price - 200 wei
✔ reserve price - 100 wei
✔ num blocks auction open for - 10
✔ offer price decrement - 10 wei
✔ is auction open
Checking Seller/Bidder Address
✔ is owner of this contract the seller
✔ is account1 wei balance greater than 0
Checking Bidders/Bidding
✔ bid from seller account
✔ bid rejected - 150 wei - insuffiecient amount
✔ bid accepted - 200 wei - sufficient amount
✔ multiple bids - first bid > current price - second bid < current price
✔ multiple bids - both bids > current price
✔ check for winner
0x70997970C51812dc3A010C7d01b50e0d17dc79C8
✔ auction ended - winner already chosen
✔ auction ended - reject bid because select number of blocks passed
✔ Checking to see if the seller received the wei

17 passing (2s)

✨ Done in 3.08s.
