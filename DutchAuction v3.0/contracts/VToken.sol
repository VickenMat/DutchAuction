// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VToken is ERC20, Ownable {
    uint256 maxSupply;

    constructor(uint256 _maxSupply) ERC20("VToken", "VT") {
        maxSupply = _maxSupply;
        require(maxSupply >= 1, "Max token supply must be greater than 0"); // throws error if max supply is set to 0
        require(
            maxSupply <= 10000,
            "Max token supply must be less than or equal to 10,000"
        ); // throws error if max supply is set to a number greater than 500
    }

    function mintERC20Token(address _address, uint256 amount) public {
        uint256 total = totalSupply();
        require(
            total <= maxSupply,
            "Number of tokens minted to this address should be less than the max supply"
        );
        require(
            (total + amount) <= maxSupply,
            "Number of tokens minted to this address plus tokens in circulation should be less than the max supply"
        );
        _mint(_address, amount); // _mint is the building block that allows us to write ERC20 extensions that implement a supply mechanism
    }

    // token rewawrd for miners that produce Ethereum blocks
    // block.coinbase accesses the address of the current block's miner
    // mint reward token to this miner's address whenever someone calls this fn
    function _mintMinerReward() public {
        _mint(block.coinbase, maxSupply);
    }

    // automates the reward to mint a miner reward for every token transfer that is included in the blockchain
    /*
    function _beforeTokenTransfer(address from, address to, uint256 value) internal virtual override{
        if(!(from == address(0) && to == block.coinbase)) {
            _mintMinerReward();
        }
        super ._beforeTokenTransfer(from, to, value);
    }
    */
}
