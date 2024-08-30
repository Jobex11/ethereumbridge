"use client";
import React, { useState } from "react";
import Web3 from "web3";

// Replace with your contract's ABI and address
const CONTRACT_ABI = [
  // ABI contents here (paste the ABI from the compiled contract)
];
const CONTRACT_ADDRESS = "0xYourContractAddress"; // Replace with your contract address

const Content = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState(null);
  const [thorchainAddress, setThorchainAddress] = useState("");
  const [amountToLock, setAmountToLock] = useState("");
  const [whitelistAddress, setWhitelistAddress] = useState("");
  const [newOwner, setNewOwner] = useState("");

  const connectWallet = async () => {
    if (account) {
      // Disconnect the wallet by resetting the state
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
        // MetaMask is not detected
        window.alert(
          "MetaMask is not installed. Please install MetaMask to use this app."
        );
        window.open("https://metamask.io/download.html", "_blank");
      }
    }
  };

  const lockETH = async () => {
    if (!web3 || !account) return;

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    try {
      await contract.methods
        .lockETH(thorchainAddress, web3.utils.toWei(amountToLock, "ether"))
        .send({
          from: account,
          value: web3.utils.toWei(amountToLock, "ether"),
        });
      console.log("Transaction successful");
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  const addToWhitelist = async () => {
    if (!web3 || !account) return;

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    try {
      await contract.methods
        .addToWhitelist(whitelistAddress)
        .send({ from: account });
      console.log("Address added to whitelist");
    } catch (error) {
      console.error("Error adding address to whitelist:", error);
    }
  };

  const transferOwnership = async () => {
    if (!web3 || !account) return;

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    try {
      await contract.methods
        .transferOwnership(newOwner)
        .send({ from: account });
      console.log("Ownership transferred");
    } catch (error) {
      console.error("Error transferring ownership:", error);
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

      {account && (
        <div className="mt-4">
          <h4>Lock ETH</h4>
          <input
            type="text"
            placeholder="Thorchain Address"
            value={thorchainAddress}
            onChange={(e) => setThorchainAddress(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Amount to Lock (ETH)"
            value={amountToLock}
            onChange={(e) => setAmountToLock(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={lockETH}
            className="bg-primary text-white p-2 rounded-lg mt-2"
          >
            Lock ETH
          </button>
        </div>
      )}

      {account && (
        <div className="mt-4">
          <h4>Add to Whitelist</h4>
          <input
            type="text"
            placeholder="Address to Whitelist"
            value={whitelistAddress}
            onChange={(e) => setWhitelistAddress(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={addToWhitelist}
            className="bg-primary text-white p-2 rounded-lg mt-2"
          >
            Add to Whitelist
          </button>
        </div>
      )}

      {account && (
        <div className="mt-4">
          <h4>Transfer Ownership</h4>
          <input
            type="text"
            placeholder="New Owner Address"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={transferOwnership}
            className="bg-primary text-white p-2 rounded-lg mt-2"
          >
            Transfer Ownership
          </button>
        </div>
      )}
    </div>
  );
};

export default Content;

/*
"use client";
import React, { useState } from "react";
import Web3 from "web3";

const CONTRACT_ABI = [];
const CONTRACT_ADDRESS = "0xYourContractAddress";

const Content = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState(null);
  const [thorchainAddress, setThorchainAddress] = useState("");
  const [amountToLock, setAmountToLock] = useState("");

  const connectWallet = async () => {
    if (account) {
      setAccount(null);
      setWeb3(null);
      setBalance(null);
      console.log("Disconnected from MetaMask");
    } else {
      if (typeof window.ethereum !== "undefined") {
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
        console.log("MetaMask is not installed");
      }
    }
  };

  const lockETH = async () => {
    if (!web3 || !account) return;

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    try {
      await contract.methods
        .lockETH(thorchainAddress, web3.utils.toWei(amountToLock, "ether"))
        .send({
          from: account,
          value: web3.utils.toWei(amountToLock, "ether"),
        });
      console.log("Transaction successful");
    } catch (error) {
      console.error("Error sending transaction:", error);
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

      {account && (
        <div className="mt-4">
          <h4>Lock ETH</h4>
          <input
            type="text"
            placeholder="Thorchain Address"
            value={thorchainAddress}
            onChange={(e) => setThorchainAddress(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Amount to Lock (ETH)"
            value={amountToLock}
            onChange={(e) => setAmountToLock(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={lockETH}
            className="bg-primary text-white p-2 rounded-lg mt-2"
          >
            Lock ETH
          </button>
        </div>
      )}
    </div>
  );
};

export default Content;
*/
