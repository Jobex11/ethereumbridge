"use client";
import React from "react";

const ConnectWallet = ({ account, connectWallet }) => {
  return (
    <button onClick={connectWallet}>
      {account
        ? `${account.slice(0, 6)}...${account.slice(-5)}`
        : "Connect Wallet"}
    </button>
  );
};

export default ConnectWallet;

/*
import React, { useState, useEffect } from "react";
import Web3 from "web3";

const ConnectWallet = ({ account, setAccount, setWeb3, setBalance }) => {
  const connectWallet = async () => {
    if (account) {
      setAccount(null);
      setWeb3(null);
      setBalance(null);
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

          const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
          const balanceEth = web3Instance.utils.fromWei(balanceWei, "ether");
          setBalance(balanceEth);

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
      <button onClick={connectWallet}>
        {account
          ? `${account.slice(0, 6)}...${account.slice(-5)}`
          : "Connect Wallet"}
      </button>
    </div>
  );
};

export default ConnectWallet;
*/
