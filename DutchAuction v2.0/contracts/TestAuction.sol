// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./MintNFT.sol";

contract TestAuction is Initializable {
    uint256 reservePrice;
    uint256 numBlocksAuctionOpen;
    uint256 offerPriceDecrement;
    uint256 initialPrice;
    address erc721TokenAddress;
    uint256 nftTokenID;

    address payable seller;
    address payable public winner;

    uint256 blockStart;
    uint256 totalBids = 0;
    uint256 refundAmount;
    bool isAuctionOpen = true;
    mapping(address => uint256) balances; // unused for now

    function initialize(
        address _erc721TokenAddress,
        uint256 _nftTokenID,
        uint256 _reservePrice,
        uint256 _numBlocksAuctionOpen,
        uint256 _offerPriceDecrement
    ) public initializer {
        reservePrice = _reservePrice;
        numBlocksAuctionOpen = _numBlocksAuctionOpen;
        offerPriceDecrement = _offerPriceDecrement;
        // sets the initial price to the equation below
        initialPrice =
            _reservePrice +
            _numBlocksAuctionOpen *
            _offerPriceDecrement;
        // assigning seller to the person who's currently connecting with the contract
        seller = payable(msg.sender);
        // assigns the current block as the starting block
        blockStart = block.number;
        // initializes token address and id
        erc721TokenAddress = _erc721TokenAddress;
        nftTokenID = _nftTokenID;
    }

    function getCurrentPrice() public view returns (uint256) {
        return initialPrice - (block.number - blockStart) * offerPriceDecrement;
    }

    // bid function makes checks, accepts or rejects bids, and executes the wei transfer if accepted
    function bid() public payable returns (address) {
        require(isAuctionOpen == true, "Auction is closed"); // checks to make sure the auction is still open
        require(
            winner == address(0),
            "You just missed out! There is already a winner for this item" // check if there is a winner
        );
        require(msg.sender != seller, "Owner cannot submit bid on own item"); // check if the owner bids on own item
        require(
            block.number - blockStart <= numBlocksAuctionOpen,
            "Auction has closed - total number of blocks the auction is open for have passed" // check if the duration of the auction has passed by seeing what block we're on
        );
        require(
            address(this).balance > 0,
            "Your accounts balance is not greater than 0" // checks if the bidding address's balance is greater than 0
        );
        require(
            msg.value >= getCurrentPrice(),
            "You have not sent sufficient funds" // check if the buyer has bid a sufficient amount
        );

        totalBids++; // increments totalBids by 1 every time a bid is entered

        require(totalBids > 0, "There must be at least one bid to finalize"); // checks if there is at least one bid on item

        winner = payable(msg.sender); // assigns winner to address with first winning bid - finalize fn

        seller.transfer(msg.value); // transfers wei from bidder to seller
        isAuctionOpen = false; // sets isAuctionOpen variable to false
        return winner;
    }

    // returns the sellers address
    function getSellerAddress() public view returns (address) {
        return seller;
    }
}
