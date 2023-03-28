import React, { useState, useEffect } from 'react';
import { ethers, Contract, Signer } from 'ethers';
import BDA_abi from './utils/BasicDutchAuction.json';

const contractAddress = '0x...'; // Replace with the deployed contract address
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
let address ="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"



function App() {
  // check if user is using metamask
  if(window.ethereum){
  
  }
  else{
    alert("please install metamask extension")
  }


  const [data, setdata] = useState({
    address:'',     // Stores address
    Balances: null  // Stores balance
  })

  async function connect() {

    // if metamask is installed we request the account
  window.ethereum.request({method: 'eth_requestAccounts'})
  .then((res : any)=>{
    console.log(res);
    return contractAddress;
  })

    // getting the balance 
    window.ethereum.request({
      method:'eth_getBalance',
      params:[address, 'latest']
    }).then((balance : any) => {
      // return string value to convert it into int balances
      console.log(balance)
      console.log(ethers.utils.formatEther(balance))
    })
    .catch((error:any)=>console.log(error));
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
