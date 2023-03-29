import React, { useState, useEffect } from 'react';
import { ethers, Signer, Contract } from 'ethers';
import BDA_abi from './utils/BasicDutchAuction.json';

const contractAddress = '...'; // Replace with the deployed contract address
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
// let address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

function App() {
  // check if user is using metamask
  // if(typeof window.ethereum !== 'undefined') {
  // if(window.ethereum)
  //   console.log('Web3 user detected');
  // }
  // else{
  //   alert("please install metamask extension")
  // }
  const [data, setdata] = useState({
    address:'',     // Stores address
    Balances: null  // Stores balance
  })
  const [connectedWallet, setConnectedAddress] = useState('')
  const [bal, setAddressBalance] = useState('')
  const [contractAddress1, setContractAddress] = useState('')

  const connect =() =>  {
    // connect wallet
    window.ethereum.request({method: 'eth_requestAccounts'})
    .then((result: any)=>{
      console.log(result);
      setConnectedAddress(result);
      setBalance(result);
      setAuctionContractAddress(result);
    })
    // function to get connected address's balance
    async function setBalance(connectedWallet:any){
    window.ethereum.request({
      method:'eth_getBalance',
      params:[String(connectedWallet), 'latest']
    }).then((balance : any) => {
      setAddressBalance(ethers.utils.formatEther(balance));
      // return string value to convert it into int balances
      console.log(balance)
      console.log(ethers.utils.formatEther(balance))
    })
    .catch((error:any)=>console.log(error));
    }
    // function to return contract address
    async function setAuctionContractAddress(connectedWallet:any){
      window.ethereum.request({
        method:'eth_getBalance',
        params:[String(connectedWallet), 'latest']
      }).then((cAddress : any) => {
        setContractAddress(cAddress);
        // return string value to convert it into int balances
        console.log(cAddress)
      })
    }
  }

  async function deploy(){
    // const [owner, address1, address2] = await ethers.getSigners();
    // seller1 = owner;
    // account1 = address1;
    // account2 = address2;
    // const MintDutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
    // const mintDutchAuction = await MintDutchAuctionFactory.deploy(100, 10, 10);
    // basicDutchAuctionToken = await mintDutchAuction.deployed();
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
    // setReservePrice('100');
    // setNumBlocksAuctionOpen('10');
    // setOfferPriceDecrement('10');
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
          <p>Connected Wallet Address <br></br>{connectedWallet}</p>
          <p>Wallet Balance <br></br>{bal}</p>
          <p>Contract Address <br></br>{contractAddress1}</p>
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
