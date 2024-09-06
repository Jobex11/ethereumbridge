"use client";
import React, { useState } from "react";
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
import Withdraw from "./components/Withdraw";
import WalletConnectModal from "./components/WalletConnectModal"; // Import modal

export default function Home() {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentOwner, setCurrentOwner] = useState(null);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

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

  // Open modal if account is not connected
  const handleActionClick = () => {
    if (!account) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar connectWallet={connectWallet} account={account} />

      <div className="flex flex-col items-center text-gray-300">
        <div className="hidden md:flex font-bold mb-4 items-center justify-center p-2 rounded-xl bg-[#1c1c24]">
          <div className="h-[50px] w-[50px]">
            <CryptoKingIcon />
          </div>
          <h3 className="text-2xl text-main">
            Eth-<span className="text-gray-200">Rune</span> Gateway
          </h3>
        </div>

        {!account && (
          <div className="hidden md:block text-center mb-4">
            <p>
              Welcome to Eth-Rune Gateway, kindly connect your Web3{" "}
              <WalletIcon />
              wallet.
            </p>
            <p>we ease the exchange of your Ethers to Rune</p>
          </div>
        )}

        {account && (
          <div>
            <p>
              <WalletIcon /> Your Wallet Address: {account}
            </p>
            <p>
              <CurrencyExchangeIcon />
              Test Eth Balance: {balance} ETH
            </p>
          </div>
        )}

        <div className="mt-2 md:mt-5">
          <div className="mx-0 md:mx-0 p-4 rounded-lg shadow-lg bg-[#1c1c24]">
            <h3 className="text-xl mb-4">ETH Management</h3>
            <div className="flex flex-col justify-start items-start space-y-4">
              <LockETH
                web3={web3}
                account={account}
                contract={contract}
                onActionClick={handleActionClick}
              />
              <Withdraw
                web3={web3}
                account={account}
                contract={contract}
                onActionClick={handleActionClick}
              />
            </div>
          </div>

          <div className="mt-4 md:mt-6 p-4  rounded-lg shadow-lg bg-[#1c1c24]">
            <h3 className="text-xl mb-4">Admin Functions</h3>
            <div className="flex flex-col md:flex-row space-x-4">
              <WhitelistAddress
                web3={web3}
                account={account}
                contract={contract}
                onActionClick={handleActionClick}
              />
              <TransferOwnership
                web3={web3}
                account={account}
                contract={contract}
                onActionClick={handleActionClick}
              />
            </div>
          </div>
        </div>

        {currentOwner && (
          <p className="p-1 mt-4 text-sm text-gray-400">
            Contract Owner: {currentOwner}
          </p>
        )}

        {/* Modal for Wallet Connect */}
        <WalletConnectModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          connectWallet={connectWallet}
        />
      </div>
    </div>
  );
}

/*

"use client";
import React, { useState } from "react";
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
        <div className="font-bold mb-4 flex items-center justify-center p-2 rounded-xl bg-[#1c1c24]">
          <div className="h-[50px] w-[50px]">
            <CryptoKingIcon />
          </div>
          <h3 className="text-2xl text-main">
            Eth-<span className="text-gray-200">Rune</span> Gateway
          </h3>
        </div>
        {!account && (
          <p className="text-center mb-4">
            Welcome to Eth-Rune Gateway, kindly connect your Web3 wallet.
          </p>
        )}

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

        <div className="mt-5">
          <div className="p-4 rounded-lg shadow-lg bg-[#1c1c24]">
            <h3 className="text-xl mb-4">ETH Management</h3>
            <div className="flex flex-col space-y-4">
              <LockETH web3={web3} account={account} contract={contract} />
              <WithdrawETH web3={web3} account={account} contract={contract} />
            </div>
          </div>

          <div className="mt-6 p-4  rounded-lg shadow-lg bg-[#1c1c24]">
            <h3 className="text-xl mb-4">Admin Functions</h3>
            <div className="flex space-x-4">
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
        </div>

        {currentOwner && (
          <p className="p-1 mt-4 text-sm text-gray-400">
            Contract Owner: {currentOwner}
          </p>
        )}
      </div>
    </div>
  );
}


*/
