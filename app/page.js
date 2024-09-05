"use client";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Navbar from "./Navbar";
import ContractABI from "./ContractABI.json";
import LockETH from "./components/LockETH";
import TaxPercentage from "./components/TaxPercentage";
import WhitelistAddress from "./components/WhitelistAddress";
import TransferOwnership from "./components/TransferOwnership";
import CryptoKingIcon from "./components/CryptoKingIcon";
import WalletIcon from "@mui/icons-material/Wallet";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import WithdrawETH from "./components/WithdrawETH";

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

          const contractInstance = new web3Instance.eth.Contract(
            ContractABI,
            contractAddress
          );
          setContract(contractInstance);

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
    <div>
      <div>
        <Navbar connectWallet={connectWallet} account={account} />
      </div>
      <div className="flex flex-col items-center text-gray-300">
        <div className="font-bold mb-4  flex items-center justify-center">
          <div className="h-[50px] w-[50px]">
            <CryptoKingIcon />
          </div>
          <h3 className="text-2xl text-main">
            Eth-<span className="text-gray-200">Rune</span> GateWay
          </h3>
        </div>
        {account && (
          <>
            <p>
              <WalletIcon /> Your Wallet Address: {account}
            </p>
            <p>
              <CurrencyExchangeIcon />
              Test Eth Balance: {balance} ETH
            </p>
          </>
        )}

        {!isMetaMaskConnected && (
          <p>
            Please connect your web3 wallet <WalletIcon /> to use the features
            below.
          </p>
        )}

        {isMetaMaskConnected && (
          <div>
            <div className="p-2 m-4">
              <LockETH web3={web3} account={account} contract={contract} />
              <WithdrawETH web3={web3} account={account} contract={contract} />
            </div>
            {/* Show WhitelistAddress and TransferOwnership to all connected wallets */}
            <div className="flex space-x-5">
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
            </div>
          </div>
        )}

        {currentOwner && (
          <p className="p-1 text-sm">Contract Owner: {currentOwner}</p>
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
import ContractABI from "./ContractABI.json";
import LockETH from "./components/LockETH";
import TaxPercentage from "./components/TaxPercentage";
import WhitelistAddress from "./components/WhitelistAddress";
import TransferOwnership from "./components/TransferOwnership";
import CryptoKingIcon from "./components/CryptoKingIcon";
import WalletIcon from "@mui/icons-material/Wallet";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import WithdrawETH from "./components/WithdrawETH";

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
      <div className="flex flex-col items-center text-gray-300">
        <div className="font-bold mb-4  flex items-center justify-center">
          <div className="h-[50px] w-[50px]">
            <CryptoKingIcon />
          </div>
          <h3 className="text-2xl text-main">
            Eth-<span className="text-gray-200">Rune</span> GateWay
          </h3>
        </div>
        {account && (
          <>
            <p>
              {" "}
              <WalletIcon /> Your Wallet Address: {account}
            </p>
            <p>
              {" "}
              <CurrencyExchangeIcon />
              Test Eth Balance: {balance} ETH
            </p>
          </>
        )}

        {!isMetaMaskConnected && (
          <p>
            Please connect your web3 wallet <WalletIcon /> to use the features
            below.
          </p>
        )}
        {isMetaMaskConnected && (
          <div>
            <div className="p-2 m-4">
              <LockETH web3={web3} account={account} contract={contract} />
              <WithdrawETH web3={web3} account={account} contract={contract} />
            </div>
            {isAdmin && (
              <div className="flex space-x-5">
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
              </div>
            )}
          </div>
        )}
        {currentOwner && (
          <p className="p-1 text-sm">Contract Owner: {currentOwner}</p>
        )}
      </div>
    </div>
  );
}

*/
