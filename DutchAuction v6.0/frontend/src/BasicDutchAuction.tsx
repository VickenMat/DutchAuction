import React, { useState, useEffect } from 'react';
import { ethers, Contract, Signer } from 'ethers';
import BDA_abi from './utils/BasicDutchAuction.json';
// /Users/vicken/Desktop/Solidity Projects/GitHub Dutch Auction/DutchAuction v6.0/contracts/BasicDutchAuction

const contractAddress = '0x...'; // Replace with the deployed contract address
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

function App() {

  async function connect() {
     
  }

  async function deploy(){

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

  // current version just for testing
  async function info(){
    setReservePrice('100');
    setNumBlocksAuctionOpen('10');
    setOfferPriceDecrement('10');

  }

  async function bid() {
    const auction = new ethers.Contract(contractAddress, BDA_abi.abi, signer);
    const bidTx = await auction.bid({value: currentPrice});
    await bidTx.wait();
    setIsAuctionOpen(false);
    setCurrentPrice(await auction.getCurrentPrice());
    setWinner(await auction.getWinnerAddress());
  }

  // async function disconnect() {
    
  // }

  return (
    <div>
      <center>
      <h1>Basic Dutch Auction</h1>
      <div>
        <h2>
          <button onClick={connect}>Connect</button>
          {/* <button disabled onClick={disconnect}>Disconnect</button> */}
        </h2>
      </div>
      <div>
        <h2>Deployment</h2>
        <p>Reserve Price {reservePrice}</p>
        <input type = ""></input>
        <p>Number of Blocks Auction Open for{numBlocksAuctionOpen}</p>
        <input type = ""></input>
        <p>Price Decrement {offerPriceDecrement}</p>
        <input type = ""></input>
        <p></p>
        <button disabled={isAuctionOpen} onClick={deploy}>Deploy</button>
        <h2>Information</h2>
        <p>Auction Open: {isAuctionOpen ? 'Yes' : 'No'}</p>
        <p>Contract Address: </p>
        <button disabled={!isAuctionOpen} onClick={info}>Show Info</button>
        <div>
        <h2>Bid</h2>
        <input type = ""></input>
        <p></p>
        <button disabled={!isAuctionOpen} onClick={bid}>Bid</button>
        </div>
        <h2>Result</h2>
        <p>Current Price: {currentPrice}</p>
        <p>Winner: {winner ? winner : 'None'}</p>
        <p>Seller: {seller}</p>
      </div>
      </center>
    </div>
  );
}

export default App;
