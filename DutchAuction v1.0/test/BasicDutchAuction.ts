import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const basicDutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
    const basicDutchAuctionToken = await basicDutchAuctionFactory.connect(owner).deploy(100, 10, 10);
    return { basicDutchAuctionToken, owner, otherAccount };
  }
describe("Deployment", function () {
    it("test", async function () {
      const { basicDutchAuctionToken, owner } = await loadFixture(deployOneYearLockFixture);
      expect(await basicDutchAuctionToken.getCurrentPrice()).to.equal(5000);
    });
  });
});
