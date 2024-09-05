"use client";
import React, { useState } from "react";

const LockETH = ({ web3, account, contract }) => {
  const [thorchainAddress, setThorchainAddress] = useState("");
  const [amountToLock, setAmountToLock] = useState("");

  const lockETH = async () => {
    if (!web3 || !account) {
      window.alert("Please connect to MetaMask first.");
      return;
    }

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
  );
};

export default LockETH;
