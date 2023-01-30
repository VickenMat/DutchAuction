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
    uint256 immutable reservePrice;
    uint256 immutable numBlocksAuctionOpen;
    uint256 immutable offerPriceDecrement;
    uint256 immutable initialPrice;

    address public buyer;
    address payable public immutable seller;
    address payable public winner;

    // maybe not needed
    mapping(address => uint256) public balances; // public key

    // variables below is from chat gpt
    uint256 public highestBid;
    uint256 public blockStart;

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

    // professors lecture
    // transfer tokens public
    function transfer(address to, uint256 amount) public {
        // deduct tokens from the sender
        balances[msg.sender] -= amount;
        // give deducted tokens to to account
        balances[to] += amount;
    }

    // return list of bidder's address - not currently working
    address payable[] public bidders;

    function getBidders() public view returns (address payable[] memory) {
        return bidders;
    }

    // returns the current price of the item at block x
    function getCurrentPrice() public view returns (uint256) {
        return
            initialPrice -
            ((block.number - 1 - blockStart) * offerPriceDecrement);
    }

    // allows users to submit a bid on the auction
    // bids can be submitted by an externally owned ETH wallet
    function bid() public payable returns (address) {
        // check if there is a winner
        require(
            winner == address(0),
            "You just missed out! There is already a winner for this item"
        );
        // check if the owner is submitting a bid on their own item
        require(msg.sender != seller, "Owner cannot submit bid on own item");
        // check if the numBlocksAuctionOpen has passed
        require(
            block.number - blockStart <= numBlocksAuctionOpen,
            "Auction has closed - total number of blocks the auction is open for have passed"
        );
        // check if the buyer has sufficient funds
        require(
            msg.value >= getCurrentPrice(),
            "You have not sent sufficient funds"
        );

        // allows for tracking and listing of all addresses who have intereacted with this contract
        // bidders.push(payable(msg.sender));

        //
        // require(msg.sender);

        // calls finalize function to
        finalize();

        return winner;
    }

    // the first bid processed by the contract that sends wei greater or equal to the current price is the winner
    // the wei should be transferred immediately to the seller and the contract should not accept any more bids
    // allows sellers to end the auction
    // function checks if the highest bid is higher
    function finalize() public {
        winner = payable(msg.sender);
    }

    // refunds the bids to all the wallets with losing bids
    // all bids besides the winner should be refunded immediately
    function refund(uint256 refundAmount) public {
        // get an array of the losing bids addresses and transfer their tokens back to them
    }

    // not working
    function viewWinner() public {
        bid();
    }
}
