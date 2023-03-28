import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import BDA_abi from './utils/BasicDutchAuction.json';
// /Users/vicken/Desktop/Solidity Projects/GitHub Dutch Auction/DutchAuction v6.0/contracts/BasicDutchAuction

const contractAddress = '0x...'; // Replace with the deployed contract address
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

function App() {
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
      <h1>Basic Dutch Auction</h1>
      <div>
        <h2>Item Information</h2>
        <p>Reserve Price: {reservePrice}</p>
        <p>Number of Blocks Auction Open: {numBlocksAuctionOpen}</p>
        <p>Offer Price Decrement: {offerPriceDecrement}</p>
        <p>Current Price: {currentPrice}</p>
        <p>Auction Open: {isAuctionOpen ? 'Yes' : 'No'}</p>
        <p>Winner: {winner ? winner : 'None'}</p>
        <p>Seller: {seller}</p>
      </div>
      <div>
        <h2>Bid Form</h2>
        <button disabled={!isAuctionOpen} onClick={bid}>Bid</button>
      </div>
    </div>
  );
}

export default App;
