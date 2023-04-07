import React, { useState } from 'react';
import './Activate.css';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

const Activate = () => {
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");

  const activate = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const all_accounts = await provider.listAccounts();
    const account = all_accounts[0];
    const balance = await provider.getBalance(account);
    console.log("Account: ", account);
    console.log("Balance: ", balance.toString());

    if (account !== null) {
      setAccountAddress(account);
      setAccountBalance(balance.toString());
    }
  }

  return (
    <div className="Activate">
      <h1>DUTCH AUCTION DEMO</h1>
      <h2>Connect Account</h2>
      <button onClick={activate}>CONNECT</button>

      <h2>Account info</h2>
      <label>Account Address:
        <input type="text" value={accountAddress} readOnly />
      </label>
      <br />
      <label>Account Balance:
        <input type="text" value={accountBalance} readOnly />
      </label>
      <br />
    </div>
  );
}

export default Activate;
