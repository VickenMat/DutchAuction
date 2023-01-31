// SPDX-License-Identifier: UNLICENSED

// This program creates a contract to manage the auction of a single, physical item at a single auction event

// npx hardhat compile
// REPORT_GAS=true npx hardhat test

pragma solidity ^0.8.17;

contract BasicDutchAuction {
    uint256 immutable reservePrice;
    uint256 immutable numBlocksAuctionOpen;
    uint256 immutable offerPriceDecrement;
    uint256 immutable initialPrice;

    address payable immutable seller;
    address payable winner;

    mapping(address => uint256) balances; // public key
    uint256 blockStart;
    uint256 totalBids = 0;

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
        // check that the starting price is greater than the num of blocks * price decrement
        require(
            _reservePrice >= _numBlocksAuctionOpen * _offerPriceDecrement,
            "Reserve price must be greater than initial price"
        );
        // assigning seller to the person who's currently connecting with the contract
        seller = payable(msg.sender);
        // assigns the starting block as the current block
        blockStart = block.number;
    }

    address payable[] bidders;

    // returns a list of all bidder's addresses
    function getBidders() public view returns (address payable[] memory) {
        return bidders;
    }

    // returns the current price of the item
    function getCurrentPrice() public view returns (uint256) {
        return
            initialPrice -
            ((block.number - 1 - blockStart) * offerPriceDecrement);
    }

    // bid function makes checks, submits bids, and executes the wei transfer if accepted
    function bid() public payable returns (address) {
        // check if there is a winner
        require(
            // displays message if the winner is not the first address
            winner == address(0),
            "You just missed out! There is already a winner for this item"
        );
        // check if the owner is submitting a bid on their own item
        require(msg.sender != seller, "Owner cannot submit bid on own item");
        // check if the duration of the auction has passed by seeing what block we're on
        require(
            block.number - blockStart <= numBlocksAuctionOpen,
            "Auction has closed - total number of blocks the auction is open for have passed"
        );
        // check if the buyer has bid a sufficient amount
        require(
            msg.value >= getCurrentPrice(),
            "You have not sent sufficient funds"
        );
        // increments totalBids by 1 every time a bid is entered
        totalBids++;
        // allows contract to append the bidders array by adding all addresses that have submitted a successful bid
        bidders.push(payable(msg.sender));

        // call finalize fn to --
        // finalize();

        seller.transfer(msg.value); // transfers money from bidder to seller
        winner = payable(msg.sender); // assigns winner to the person who placed the first winning bid
        return winner;
    }

    // the first bid processed by the contract that sends wei greater or equal to the current price is the winner
    // the wei should be transferred immediately to the seller and the contract should not accept any more bids
    // allows sellers to end the auction
    function finalize() public {
        require(totalBids > 0, "There must be at least one bid to finalize");
    }

    // refunds the bids to all the wallets with losing bids
    // all bids besides the winner should be refunded immediately
    // after auction is closed, if anyone submits a bid, they will see a message saying "auction closed" or whatever
    // they will then call this function to get their wei back
    function refund(uint256 refundAmount) public payable {
        // get an array of the losing bids addresses and transfer their tokens back to them
        require(seller != winner, "Seller cannot refund themselves");
        require(address(0) != winner, "You won the auction! Nothing to refund");
        // balances[]
        seller.transfer(refundAmount);
    }

    // returns the address of the winning bid
    function viewWinner() public view returns (address) {
        return winner;
    }
}
