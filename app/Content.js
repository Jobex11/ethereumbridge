"use client";
import React, { useState } from "react";
import Web3 from "web3";

const Content = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (account) {
      // Disconnect the wallet by resetting the state
      setAccount(null);
      setWeb3(null);
      setBalance(null);
      console.log("Disconnected from MetaMask");
    } else {
      if (typeof window.ethereum !== "undefined") {
        try {
          // Create a new Web3 instance with the MetaMask provider
          const web3Instance = new Web3(window.ethereum);
          // Request account access
          await window.ethereum.request({ method: "eth_requestAccounts" });
          // Get the user's accounts
          const accounts = await web3Instance.eth.getAccounts();
          // Set the first account as the connected account
          setAccount(accounts[0]);
          setWeb3(web3Instance);

          // Fetch the balance
          const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
          const balanceEth = web3Instance.utils.fromWei(balanceWei, "ether");
          setBalance(balanceEth);

          console.log("Connected account:", accounts[0]);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        console.log("MetaMask is not installed");
      }
    }
  };

  return (
    <div>
      <div>
        <h3>Welcome to EthBridge</h3>
        <button
          onClick={connectWallet}
          className="bg-primary text-white p-2 rounded-lg"
        >
          {account
            ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect Wallet"}
        </button>
        {account && (
          <div className="mt-4">
            <p>Balance: {balance ? `${balance} BNB` : "Loading..."}</p>
          </div>
        )}
      </div>
      <div>{/* Additional content */}</div>
    </div>
  );
};

export default Content;

/*
import React from "react";

const Content = () => {
  return (
    <div>
      <div>
        <div>
          <h3>Welcome to EthBrigde</h3>
          <button className="bg-primary text-white p-2 rounded-lg">
            connect wallet
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Content;

*/
