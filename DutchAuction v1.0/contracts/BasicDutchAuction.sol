// SPDX-License-Identifier: UNLICENSED

// This program creates a contract to manage the auction of a single, physical item at a single auction event
// *notes*
// seller is the owner of the contract
// auction begins at the block in which the contract is created
// initialPrice = reservePrice + numBlocksAuctionOpen * offerPriceDecrement

// npx hardhat compile
// REPORT_GAS=true npx hardhat test

pragma solidity ^0.8.17;

// creates a contract
contract BasicDutchAuction {
    // initializing variables to be used in constructor
    uint256 public reservePrice;
    uint256 public numBlocksAuctionOpen;
    uint256 public offerPriceDecrement;
    uint256 public initialPrice;

    uint256 public totalSupply; // used for testing
    mapping(address => uint256) public balances; // public key

    // variables below is from chat gpt
    uint256 public highestBid;
    uint256 public blockStart;
    address payable public seller;
    address payable public highestBidder;

    // constructor which initializes 5 variables
    constructor(
        uint256 _reservePrice, // minimum amount of wei that the seller is willing to accept for the item
        uint256 _numBlocksAuctionOpen, // number of blockchain blocks that the auction is open for
        uint256 _offerPriceDecrement // amount of wei that the auction price should decrease by during each subsequent block
    ) {
        // sets the initial price to the equation below
        initialPrice =
            _reservePrice +
            _numBlocksAuctionOpen *
            _offerPriceDecrement;
        reservePrice = _reservePrice;
        numBlocksAuctionOpen = _numBlocksAuctionOpen;
        offerPriceDecrement = _offerPriceDecrement;

        // from professors lecture
        totalSupply = 5000; // set total supply to 5,000
        // give creator of contract total supply of tokens
        balances[msg.sender] = totalSupply; // msg.sender represents the account used to call this constructor/create this contract

        // chat gpt variables below
        // assigning seller to the person who's currently connecting with the contract
        seller = payable(msg.sender);
        // assigns the starting block as the number x in the chain
        blockStart = block.number;
    }

    /* testing function to return total supply
    // dont NEED this anymore now that it's public
    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }
    */

    // professors lecture
    // transfer tokens public
    function transfer(address to, uint256 amount) public {
        // deduct tokens from the sender
        balances[msg.sender] -= amount;
        // give deducted tokens to to account
        balances[to] += amount;
    }

    // allows users to submit a bid on the auction
    // bids can be submitted by an externally owned ETH wallet
    function bid() public payable {
        // returns (address) - add this after payable and before {}
        // return address(0); // returns the address of the winner?

        // everything here and down is chat gpt code
        // require is used to verify inputs and conditions before execution
        require(msg.value >= initialPrice); // msg.value contains the amount of wei sent in the tx
        require(block.number - blockStart <= numBlocksAuctionOpen); // block x - starting block must be < = num of blocks auction is open for

        // if the highest bidder isnt the seller, transfer the highest bid?
        if (highestBidder != address(0)) {
            highestBidder.transfer(highestBid);
        }

        highestBidder = payable(msg.sender); // highest bidder is the wallet most recently transacting with contract
        highestBid = msg.value; // highest bid is the value
        initialPrice -= offerPriceDecrement; // decrements the offer price
        // end chat gpt code for this function
    }

    // the first bid processed by the contract that sends wei greater or equal to the current price is the winner
    // the wei should be transferred immediately to the seller and the contract should not accept any more bids
    // allows sellers to end the auction
    // function checks if the highest bid is higher
    function finalize() public {
        // start chat gpt code
        require((msg.sender == seller));
        require(block.number - blockStart > numBlocksAuctionOpen);

        if (highestBid >= reservePrice) {
            seller.transfer(highestBid);
        } else {
            highestBidder.transfer(highestBid);
        }
        // end chat gpt code for this function
    }

    // refunds the bids to all the wallets with losing bids
    // all bids besides the winner should be refunded immediately
    function refund(uint256 refundAmount) public {}
}
