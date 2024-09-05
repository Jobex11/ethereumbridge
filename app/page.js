"use client";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Navbar from "./Navbar";
import ContractABI from "./ContractABI.json";
import LockETH from "./components/LockETH";
import WithdrawETH from "./components/WithdrawETH";
import TaxPercentage from "./components/TaxPercentage";
import WhitelistAddress from "./components/WhitelistAddress";
import TransferOwnership from "./components/TransferOwnership";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentOwner, setCurrentOwner] = useState(null);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [taxPercentage, setTaxPercentage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const contractAddress = "0x72B65e53c25E4200788F93a8b0D82dCE7184A708";

  const connectWallet = async () => {
    if (account) {
      setAccount(null);
      setWeb3(null);
      setBalance(null);
      setContract(null);
      setCurrentOwner(null);
      setIsMetaMaskConnected(false);
      setTaxPercentage(null);
      setIsAdmin(false);
      console.log("Disconnected from MetaMask");
    } else {
      if (
        typeof window.ethereum !== "undefined" &&
        window.ethereum.isMetaMask
      ) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          setWeb3(web3Instance);
          setIsMetaMaskConnected(true);

          const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
          const balanceEth = web3Instance.utils.fromWei(balanceWei, "ether");
          setBalance(balanceEth);

          const contractInstance = new web3Instance.eth.Contract(
            ContractABI,
            contractAddress
          );
          setContract(contractInstance);

          const owner = await contractInstance.methods.admin().call();
          setCurrentOwner(owner);
          setIsAdmin(accounts[0].toLowerCase() === owner.toLowerCase());

          console.log("Connected account:", accounts[0]);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        window.alert(
          "MetaMask is not installed. Please install MetaMask to use this app."
        );
        window.open("https://metamask.io/download.html", "_blank");
      }
    }
  };

  return (
    <div>
      <div>
        <Navbar connectWallet={connectWallet} account={account} />
      </div>
      <div className="border flex flex-col items-center text-gray-300">
        <h1 className="text-2xl font-bold mb-4">Eth-Rune GateWay</h1>
        {account && (
          <>
            <p>Connected Wallet Address: {account}</p>
            <p>Connected Wallet Balance: {balance} ETH</p>
          </>
        )}
        {currentOwner && <p>Current Contract Owner: {currentOwner}</p>}
        {!isMetaMaskConnected && (
          <p>Please connect to MetaMask to use the features below.</p>
        )}
        {isMetaMaskConnected && (
          <div>
            <LockETH web3={web3} account={account} contract={contract} />
            <WithdrawETH web3={web3} account={account} contract={contract} />
            <TaxPercentage
              web3={web3}
              contract={contract}
              taxPercentage={taxPercentage}
              setTaxPercentage={setTaxPercentage}
            />
            {isAdmin && (
              <>
                <WhitelistAddress
                  web3={web3}
                  account={account}
                  contract={contract}
                />
                <TransferOwnership
                  web3={web3}
                  account={account}
                  contract={contract}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/*
"use client";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Navbar from "./Navbar";
import ContractABI from "./ContractABI.json"; // Import ABI JSON
import LockETH from "./components/LockETH"; // Import LockETH component

export default function Home() {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentOwner, setCurrentOwner] = useState(null);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

  const contractAddress = "0x72B65e53c25E4200788F93a8b0D82dCE7184A708";
  const connectWallet = async () => {
    if (account) {
      setAccount(null);
      setWeb3(null);
      setBalance(null);
      setContract(null);
      setCurrentOwner(null);
      setIsMetaMaskConnected(false);
      console.log("Disconnected from MetaMask");
    } else {
      if (
        typeof window.ethereum !== "undefined" &&
        window.ethereum.isMetaMask
      ) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          setWeb3(web3Instance);
          setIsMetaMaskConnected(true);

          const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
          const balanceEth = web3Instance.utils.fromWei(balanceWei, "ether");
          setBalance(balanceEth);

          // Create contract instance
          const contractInstance = new web3Instance.eth.Contract(
            ContractABI,
            contractAddress
          );
          setContract(contractInstance);

          // Fetch current owner from the contract
          const owner = await contractInstance.methods.admin().call();
          setCurrentOwner(owner);

          console.log("Connected account:", accounts[0]);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        window.alert(
          "MetaMask is not installed. Please install MetaMask to use this app."
        );
        window.open("https://metamask.io/download.html", "_blank");
      }
    }
  };

  return (
    <div className="p-4">
      <Navbar connectWallet={connectWallet} account={account} />
      <h1 className="text-2xl font-bold mb-4">Ethereum to Thorchain Bridge</h1>
      {account && (
        <>
          <p>Connected Wallet Address: {account}</p>
          <p>Connected Wallet Balance: {balance} ETH</p>
        </>
      )}
      {currentOwner && <p>Current Contract Owner: {currentOwner}</p>}
      {!isMetaMaskConnected && (
        <p>Please connect to MetaMask to use the Lock ETH feature.</p>
      )}
      {isMetaMaskConnected && (
        <LockETH web3={web3} account={account} contract={contract} />
      )}
    </div>
  );
}


*/
