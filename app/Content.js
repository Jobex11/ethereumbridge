"use client";
import React, { useState, useEffect } from "react";
import Web3 from "web3";

// Replace with your contract's ABI and address
const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldAdmin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "thorchainAddress",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tax",
        type: "uint256",
      },
    ],
    name: "LockedETHForRUNE",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "thorchainAddress",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amountToLock",
        type: "uint256",
      },
    ],
    name: "lockETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isWhitelisted",
        type: "bool",
      },
    ],
    name: "setWhitelisted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "transferAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isWhitelisted",
        type: "bool",
      },
    ],
    name: "Whitelisted",
    type: "event",
  },
  {
    inputs: [],
    name: "withdrawETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isWhitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TAX_PERCENTAGE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const CONTRACT_ADDRESS = "0x72B65e53c25E4200788F93a8b0D82dCE7184A708"; // Replace with your contract address

const Content = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState(null);
  const [thorchainAddress, setThorchainAddress] = useState("");
  const [amountToLock, setAmountToLock] = useState("");
  const [whitelistAddress, setWhitelistAddress] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [taxPercentage, setTaxPercentage] = useState(null);
  const [admin, setAdmin] = useState(null);

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
        .setWhitelisted(whitelistAddress, true)
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
      await contract.methods.transferAdmin(newOwner).send({ from: account });
      console.log("Ownership transferred");
    } catch (error) {
      console.error("Error transferring ownership:", error);
    }
  };

  const withdrawETH = async () => {
    if (!web3 || !account) return;

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    try {
      await contract.methods.withdrawETH().send({ from: account });
      console.log("Withdrawal successful");
    } catch (error) {
      console.error("Error withdrawing ETH:", error);
    }
  };

  const getTaxPercentage = async () => {
    if (!web3) return;

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    try {
      const tax = await contract.methods.TAX_PERCENTAGE().call();
      setTaxPercentage(web3.utils.fromWei(tax, "ether"));
    } catch (error) {
      console.error("Error fetching tax percentage:", error);
    }
  };

  const getAdmin = async () => {
    if (!web3) return;

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    try {
      const adminAddress = await contract.methods.admin().call();
      setAdmin(adminAddress);
    } catch (error) {
      console.error("Error fetching admin address:", error);
    }
  };

  useEffect(() => {
    if (web3 && account) {
      getTaxPercentage();
      getAdmin();
    }
  }, [web3, account]);

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
            <p>Balance: {balance ? `${balance} ETH` : "Loading..."}</p>
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

      {account && (
        <div className="mt-4">
          <h4>Withdraw ETH</h4>
          <button
            onClick={withdrawETH}
            className="bg-primary text-white p-2 rounded-lg"
          >
            Withdraw ETH
          </button>
        </div>
      )}

      {taxPercentage !== null && (
        <div className="mt-4">
          <h4>Tax Percentage</h4>
          <p>{taxPercentage} ETH</p>
        </div>
      )}

      {admin !== null && (
        <div className="mt-4">
          <h4>Current Admin Address</h4>
          <p>{admin}</p>
        </div>
      )}
    </div>
  );
};

export default Content;

/*
"use client";
import React, { useState, useEffect } from "react";
import Web3 from "web3";

// Replace with your contract's ABI and address
const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldAdmin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "thorchainAddress",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tax",
        type: "uint256",
      },
    ],
    name: "LockedETHForRUNE",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isWhitelisted",
        type: "bool",
      },
    ],
    name: "Whitelisted",
    type: "event",
  },
  {
    inputs: [],
    name: "TAX_PERCENTAGE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isWhitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "thorchainAddress",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amountToLock",
        type: "uint256",
      },
    ],
    name: "lockETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isWhitelisted",
        type: "bool",
      },
    ],
    name: "setWhitelisted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "transferAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const CONTRACT_ADDRESS = "0x72B65e53c25E4200788F93a8b0D82dCE7184A708"; // Replace with your contract address

const Content = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState(null);
  const [thorchainAddress, setThorchainAddress] = useState("");
  const [amountToLock, setAmountToLock] = useState("");
  const [whitelistAddress, setWhitelistAddress] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [taxPercentage, setTaxPercentage] = useState(null);
  const [admin, setAdmin] = useState(null);

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

  const withdrawETH = async () => {
    if (!web3 || !account) return;

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    try {
      await contract.methods
        .withdrawETH(web3.utils.toWei(withdrawAmount, "ether"))
        .send({ from: account });
      console.log("Withdrawal successful");
    } catch (error) {
      console.error("Error withdrawing ETH:", error);
    }
  };

  const getTaxPercentage = async () => {
    if (!web3) return;

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    try {
      const tax = await contract.methods.taxPercentage().call();
      setTaxPercentage(web3.utils.fromWei(tax, "ether"));
    } catch (error) {
      console.error("Error fetching tax percentage:", error);
    }
  };

  const getAdmin = async () => {
    if (!web3) return;

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    try {
      const adminAddress = await contract.methods.admin().call();
      setAdmin(adminAddress);
    } catch (error) {
      console.error("Error fetching admin address:", error);
    }
  };

  useEffect(() => {
    if (web3 && account) {
      getTaxPercentage();
      getAdmin();
    }
  }, [web3, account]);

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

      {account && (
        <div className="mt-4">
          <h4>Withdraw ETH</h4>
          <input
            type="number"
            placeholder="Amount to Withdraw (ETH)"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={withdrawETH}
            className="bg-primary text-white p-2 rounded-lg mt-2"
          >
            Withdraw ETH
          </button>
        </div>
      )}

      <div className="mt-4">
        <h4>Tax Percentage</h4>
        <p>{taxPercentage !== null ? `${taxPercentage} ETH` : "Loading..."}</p>
      </div>

      <div className="mt-4">
        <h4>Current Admin</h4>
        <p>{admin ? admin : "Loading..."}</p>
      </div>
    </div>
  );
};

export default Content;


*/
