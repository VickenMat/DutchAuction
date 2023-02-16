import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { assert } from "console";
import { MintNFT } from "../typechain-types";
import { NFTDutchAuction } from "../typechain-types/contracts/NFTDutchAuction";
// import { Signer } from "ethers";

describe("MintNFT", function () {
  let MintNFT: any;
  let mintNFT: any;
  let owner: any;
  let addr1: any;

  beforeEach(async function () {
    MintNFT = await ethers.getContractFactory("MintNFT");
    [owner, addr1] = await ethers.getSigners();
    mintNFT = await MintNFT.deploy(10);
    await mintNFT.deployed();
  });

  describe("deployment with max supply", function () {
    it("should set the max supply", async function () {
      expect(await mintNFT.maxSupply()).to.equal(10);
    });
  });

  describe("safeMint", function () {
    it("should mint a new NFT to the owner", async function () {
      const uri = "https://example.com/token/1";
      await mintNFT.safeMint(owner.address, uri);
      expect(await mintNFT.balanceOf(owner.address)).to.equal(1);
    });

    it("should not mint more tokens than the max supply", async function () {
      const uri = "https://example.com/token/1";
      for (let i = 0; i < 10; i++) {
        await mintNFT.safeMint(owner.address, uri);
      }
      await expect(mintNFT.safeMint(owner.address, uri)).to.be.revertedWith(
        "Max number of tokens minted"
      );
    });
  });

    


});