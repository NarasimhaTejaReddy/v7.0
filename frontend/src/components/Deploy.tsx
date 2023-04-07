import React, { useState } from 'react';
import { ethers } from 'ethers';
import BasicDutchAuction from './BasicDutchAuction.json';
import './Deploy.css';

const Deploy = () => {
  const [contractAddress, setContractAddress] = useState("");

  const deploy = async () => {
    const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
    const contract = new ethers.ContractFactory(BasicDutchAuction.abi, BasicDutchAuction.bytecode, signer);

    const initialPrice = document.getElementById("initialPrice") as HTMLInputElement;
    const numberOfBlocks = document.getElementById("numberOfBlocks") as HTMLInputElement;
    const priceDecrement = document.getElementById("priceDecrement") as HTMLInputElement;
    console.log('initialPrice', initialPrice.value);
    console.log('numberOfBlocks', numberOfBlocks.value);
    console.log('priceDecrement', priceDecrement.value);

    const deployedContract = await contract.deploy(initialPrice.value, numberOfBlocks.value, priceDecrement.value);
    await deployedContract.deployed();
    console.log("Contract deployed to:", deployedContract.address);
    setContractAddress(deployedContract.address);
  }

  return (
    <div className="Deploy">
      <h1>Deploy Contract</h1>

      <label>Initial Price:
        <input type="text" id="initialPrice" name="initialPrice" />
      </label>
      <br />

      <label>Number of Blocks open:
        <input type="text" id="numberOfBlocks" name="numberOfBlocks" />
      </label>
      <br />

      <label>Price Decrement:
        <input type="text" id="priceDecrement" name="priceDecrement" />
      </label>
      <br />

      <button className='DeployButton' onClick={deploy}>Deploy</button>
      <br />

      <label>Contract Address:
        <input type="text" id="contractAddress" name="contractAddress" value={contractAddress} readOnly />
      </label>
      <br />
    </div>
  );
}

export default Deploy;
