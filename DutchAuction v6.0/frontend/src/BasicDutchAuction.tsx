import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import BDA_abi from './utils/BasicDutchAuction.json';
// /Users/vicken/Desktop/Solidity Projects/GitHub Dutch Auction/DutchAuction v6.0/contracts/BasicDutchAuction

const contractAddress = '0x...'; // Replace with the deployed contract address
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

function App() {

  async function connect() {
    
  }
  async function disconnect() {
    
  }

  async function deploy(){

  }

  async function info(){

  }

  const [reservePrice, setReservePrice] = useState('');
  const [numBlocksAuctionOpen, setNumBlocksAuctionOpen] = useState('');
  const [offerPriceDecrement, setOfferPriceDecrement] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [isAuctionOpen, setIsAuctionOpen] = useState(false);
  const [winner, setWinner] = useState('');
  const [seller, setSeller] = useState('');

  useEffect(() => {
    async function fetchData() {
      const auction = new ethers.Contract(contractAddress, BDA_abi.abi, provider);
      setReservePrice(await auction.getReservePrice());
      setNumBlocksAuctionOpen(await auction.getNumBlocksAuctionOpen());
      setOfferPriceDecrement(await auction.getPriceDecrement());
      setCurrentPrice(await auction.getCurrentPrice());
      setIsAuctionOpen(await auction.isAuctionOpen());
      setWinner(await auction.getWinnerAddress());
      setSeller(await auction.getSellerAddress());
    }
    fetchData();
  }, []);

  async function bid() {
    const auction = new ethers.Contract(contractAddress, BDA_abi.abi, signer);
    const bidTx = await auction.bid({value: currentPrice});
    await bidTx.wait();
    setIsAuctionOpen(false);
    setCurrentPrice(await auction.getCurrentPrice());
    setWinner(await auction.getWinnerAddress());
  }

  return (
    <div>
      <center>
      <h1>Basic Dutch Auction</h1>
      <div>
        <h2>
          <button disabled onClick={connect}>Connect</button>
          <button disabled onClick={disconnect}>Disconnect</button>
        </h2>
      </div>
      <div>
        <h2>Inputs</h2>
        <p>Reserve Price: {reservePrice}</p>
        <p>Number of Blocks Auction Open: {numBlocksAuctionOpen}</p>
        <p>Offer Price Decrement: {offerPriceDecrement}</p>
        <button disabled={isAuctionOpen} onClick={deploy}>Deploy</button>
        <h2>General Information</h2>
        <p>Auction Open: {isAuctionOpen ? 'Yes' : 'No'}</p>
        <p>Contract Address: </p>
        <button disabled={!isAuctionOpen} onClick={info}>Show Info</button>
        <div>
        <h2>Bid Here</h2>
        <button disabled={!isAuctionOpen} onClick={bid}>Bid</button>
        </div>
        <h2>Results</h2>
        <p>Current Price: {currentPrice}</p>
        <p>Winner: {winner ? winner : 'None'}</p>
        <p>Seller: {seller}</p>
      </div>
      </center>
    </div>
  );
}

export default App;
