
import React, { useState } from 'react';
import { ethers } from 'ethers';
import BasicDutchAuction from './BasicDutchAuction.json';
import './AuctionBidding.css';

function AuctionBidding() {
  const [currentPrice, setCurrentPrice] = useState('');
  const [owner, setOwner] = useState('');
  const [auctionStatus, setAuctionStatus] = useState('');
  const [winnerAddressInfo, setWinnerAddressInfo] = useState('');
  const [statusAfterBidding, setStatusAfterBidding] = useState('');
  const [winnerAddress, setWinnerAddress] = useState('');

  const getInfo = async () => {
    const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
    const contractAddress = document.getElementById('contractAddress') as HTMLInputElement;
    const contract = new ethers.Contract(contractAddress.value.toString(), BasicDutchAuction.abi, signer);

    const currentPriceValue = await contract.get_current_price();
    const ownerValue = await contract.seller();
    const auctionStatusValue = await contract.auction_open();
    const winnerAddressValue = await contract.winner();
    const default_address = '0x0000000000000000000000000000000000000000';

    if (currentPriceValue !== null) {
      setCurrentPrice(currentPriceValue.toString());
    }
    if (ownerValue !== null) {
      setOwner(ownerValue.toString());
    }
    if (auctionStatusValue !== null) {
      setAuctionStatus(auctionStatusValue.toString());
    }
    if (winnerAddressValue !== null) {
      if (winnerAddressValue.toString() === default_address) {
        setWinnerAddressInfo('0x00');
      } else {
        setWinnerAddressInfo(winnerAddressValue.toString());
        setCurrentPrice('0');
        setAuctionStatus('false');
      }
    }
  };

  const bidding = async () => {
    try {
      const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
      const contractAddress = document.getElementById('contractAddressInfo') as HTMLInputElement;
      const biddingPrice = document.getElementById('biddingPrice') as HTMLInputElement;
      const winnerAddress = document.getElementById('winnerAddress') as HTMLInputElement;

      const contract = new ethers.Contract(contractAddress.value.toString(), BasicDutchAuction.abi, signer);
      const winner = await contract.bid({ value: `${biddingPrice.value}` });

      if (winner !== null) {
        setStatusAfterBidding("Bidding Successful! You have won the auction.");
        setWinnerAddress(winner.from);
      }
    } catch (error: any) {
      setStatusAfterBidding(error.reason);
    }
  };




        return(
            
            <div className="AuctionBidding">
                
                <h1>Information about the Contract</h1>
                
                <label>Contract Address:
                    <input type="text" id="contractAddressInfo" name="contractAddress" />
                </label>
                <br/>
                <button className='BidButton' onClick={getInfo}>Get info</button>
                <br/>
                <label>Current Price: 
                    <input type="text" value={currentPrice} name="currentPrice" />
                </label>
                <br/>
                <label>Contract Owner: 
                    <input type="text" value={owner} name="owner" />
                </label>
                <br/>
                <label>Dutch Auction Status:
                    <input type="text" value={auctionStatus} name="auctionStatus" />
                </label>
                <label>Winner Address: 
                    <input type="text" value={winnerAddressInfo} name="winnerAddressInfo" />
                </label>
                <br/>
                
            
                <h1>Auction Bidding</h1>
                
                <label>Contract Address:
                    <input type="text" id="contractAddress" name="contractAddress" />
                </label>

                <label>Bidding Price: 
                    <input type="text" id="biddingPrice" name="biddingPrice" />
                </label>
                <br/>
                <button className='BidButton' onClick={bidding}>Bid</button>
                <br/>
                <label >Status after bidding
                    <input className= 'status-label' type="text" value={statusAfterBidding} name="statusAfterBidding" />
                </label>
                <br/>
                <label>Winner's address: 
                    <input type="text" value={winnerAddress} name="winnerAddress" />
                </label>
                <br/>
                
            </div>
        );
    }

export default AuctionBidding;




 