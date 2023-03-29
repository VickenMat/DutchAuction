import React, { useState, useEffect } from 'react';
import { ethers, Signer, Contract } from 'ethers';
import BDA_abi from './utils/BasicDutchAuction.json';

const [reservePrice, setReservePrice] = useState('');
const [numBlocksAuctionOpen, setNumBlocksAuctionOpen] = useState('');
const [offerPriceDecrement, setOfferPriceDecrement] = useState('');
const [currentPrice, setCurrentPrice] = useState('');
const [isAuctionOpen, setIsAuctionOpen] = useState(false);
const [winner, setWinner] = useState('');
const [seller, setSeller] = useState('');

function App() {
  // const ABI = abi.abi;
  const [connectedWallet, setConnectedAddress] = useState('')
  const [bal, setAddressBalance] = useState('')
  const [contractAddress, setContractAddress] = useState('')
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [constructorParameter, setConstructorParameter] = useState({
    reservePrice: '',
    numBlocksAuctionOpen: '',
    offerPriceDecrement: '',
  })

  // connect to wallet
  const connect = () =>  {
    if(!window.ethereum)
      alert("Please install metamask extension")

    // connect wallet
    window.ethereum.request({method: 'eth_requestAccounts'})
    .then((result: any)=>{
      console.log(result);
      setConnectedAddress(result);
      setBalance(result);
      setAuctionContractAddress(result);
      setIsWalletConnected(true);
      alert("Metamask wallet connected")
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
      })
    }
  }

  const BasicDutchAuction = async() =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(); 
    const AuctionFactory = new ethers.Contract(contractAddress, BDA_abi.abi, provider);
    const AuctionToken = await AuctionFactory.deploy(constructorParameter);

    let currentPrice = 
    
  }



  // deploy smart contract
  const deploy = () =>  {
    // const [owner, address1, address2] = await ethers.getSigners();
    // seller1 = owner;
    // account1 = address1;
    // account2 = address2;
    // const MintDutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
    // const mintDutchAuction = await MintDutchAuctionFactory.deploy(100, 10, 10);
    // basicDutchAuctionToken = await mintDutchAuction.deployed();
    // const BasicDutchAuction = new ethers.Contract(contractAddress, BDA_abi.abi, provider);
    // const auction = new ethers.deploy(BasicDutchAuction.setConstructorParameter());

    // if(reservePrice !== '' && numBlocksAuctionOpen !== '' && offerPriceDecrement !== ''){
         setIsAuctionOpen(BasicDutchAuction.isAuctionOpen(true));
    //   alert('Auction contract deployed with set parameters');
    // }
    // else
    //   alert('Please enter only integers in the boxes above');
  }

  // current version just for testing
  async function showInfo(){
    // export const loadCurrentMessage = async () => {
    //   const reservePrice = await BasicDutchAuction.methods.message().call();
    //   return reservePrice;
    // }
    
    // return numBlocksAuctionOpen;
    // return offerPriceDecrement; 
  }

  async function bid() {
    const auction = new ethers.Contract(contractAddress, BDA_abi.abi, signer);
    const bidTx = await auction.bid({value: currentPrice});
    await bidTx.wait();
    if(bidTx >= currentPrice)
      setIsAuctionOpen(false);
    setCurrentPrice(await auction.getCurrentPrice());
    setWinner(await auction.getWinnerAddress());
    if(bidTx === "")
      alert('Please do not leave bid box empty')
    if(bidTx < currentPrice)
      alert('Cannot bid below current price');
    if(bidTx < setAddressBalance(ethers.utils.formatEther(bal)))
      alert('Cannot bid more wei than you own')
    else
      alert('Thank you for bidding');
  }

  return (
    <div>
      <center>
      <h1>Basic Dutch Auction</h1>
      <div>
        <h2>
          <button onClick={connect}>Connect</button>
          <button disabled={!isWalletConnected} onClick={disconnect}>Disconnect</button>
        </h2>
          <p>Connected Wallet Address <br></br>{connectedWallet}</p>
          <p>Wallet Balance <br></br>{bal}</p>
          <p>Contract Address <br></br>{contractAddress}</p>
      </div>
      <div>
        <h2>Deployment</h2>
        <p>Reserve Price {reservePrice}</p>
        <input type = 'number'></input>
        <p>Number of Blocks Auction Open for{numBlocksAuctionOpen}</p>
        <input type = 'number'></input>
        <p>Price Decrement {offerPriceDecrement}</p>
        <input type = 'number'></input>
        <p></p>
        <button disabled={isAuctionOpen} onClick={deploy}>Deploy</button>
        <h2>Information</h2>
        <button disabled={!isAuctionOpen} onClick={showInfo}>Show Info</button>
          <p>Auction Open: {isAuctionOpen ? 'Yes' : 'No'}</p>
          <p>Reserve Price: {}</p>
          <p>Number of Blocks Auction Open for: {}</p>
          <p>Price Decrement: {}</p>
        <div>
        <h2>Bid</h2>
        <input type = 'number'></input>
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



  // disconnect from wallet
  const disconnect = () =>  {
    // ethereum.on('disconnect', handler: (error: ProviderRpcError) => void);
    // ethereum.on('accountsChanged', handler: (accounts: Array<string>) => void);
    // ethereum.on('chainChanged', handler: (chainId: string) => void);
    //   ethereum.on('chainChanged', (_chainId) => window.location.reload());
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     const auction = new ethers.Contract(contractAddress, BDA_abi.abi, provider);
  //     setReservePrice(await auction.getReservePrice());
  //     setNumBlocksAuctionOpen(await auction.getNumBlocksAuctionOpen());
  //     setOfferPriceDecrement(await auction.getPriceDecrement());
  //     setCurrentPrice(await auction.getCurrentPrice());
  //     setIsAuctionOpen(await auction.isAuctionOpen(true));
  //     setWinner(await auction.getWinnerAddress());
  //     setSeller(await auction.getSellerAddress());
  //   }
  //   fetchData();
  // }, []);