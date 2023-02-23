// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VToken is ERC20, Ownable {
    uint256 initialSupply;

    constructor(uint256 _initialSupply) ERC20("VToken", "VT") {
        initialSupply = _initialSupply;
        require(
            initialSupply >= 1,
            "Initial token supply must be greater than 0"
        ); // throws error if max supply is set to 0
        require(
            initialSupply <= 10000,
            "Max token supply must be less than or equal to 10,000"
        ); // throws error if max supply is set to a number greater than 500
        _mint(msg.sender, _initialSupply); // _mint is the building block that allows us to write ERC20 extensions that implement a supply mechanism
    }

    // token rewawrd for miners that produce Ethereum blocks
    // block.coinbase accesses the address of the current block's miner
    // mint reward token to this miner's address whenever someone calls this fn
    function _mintMinerReward() public {
        _mint(block.coinbase, initialSupply / 20);
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
