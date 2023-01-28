// SPDX-License-Identifier: UNLICENSED

// npm install @openzeppelin/contracts in terminal
// used for testing

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") {}
}
