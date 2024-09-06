import React, { useState } from "react";

const LockETH = ({ web3, account, contract, onActionClick }) => {
  const [thorchainAddress, setThorchainAddress] = useState("");
  const [amountToLock, setAmountToLock] = useState("");

  const lockETH = async () => {
    if (!web3 || !account) {
      onActionClick(); // Show the modal if the wallet is not connected
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
      <h4>Change Your Eth-2-Rune</h4>
      <div className="space-x-4">
        <input
          type="text"
          placeholder="Rune Address"
          value={thorchainAddress}
          onChange={(e) => setThorchainAddress(e.target.value)}
          className="p-2 border rounded w-60"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amountToLock}
          onChange={(e) => setAmountToLock(e.target.value)}
          className="p-2 border rounded w-28"
        />
      </div>
      <h5 className="text-sm text-red-600 py-1">
        2.5% of Eth Sent will be deducted as charges.
      </h5>
      <div>
        <button
          onClick={lockETH}
          className="bg-main hover:bg-[#278256] text-white p-2 rounded-lg"
        >
          Send ETH
        </button>
      </div>
    </div>
  );
};

export default LockETH;

/*
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
      <h4>Change Your Eth-2-Rune</h4>
      <div className="space-x-4">
        <input
          type="text"
          placeholder="Rune Address"
          value={thorchainAddress}
          onChange={(e) => setThorchainAddress(e.target.value)}
          className="p-2 border rounded w-60"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amountToLock}
          onChange={(e) => setAmountToLock(e.target.value)}
          className="p-2 border rounded w-28"
        />
      </div>
      <h5 className="text-sm text-red-600 py-1">
        2.5% of Eth Sent will be deducted as charges.
      </h5>
      <div>
        <button
          onClick={lockETH}
          className="bg-main hover:bg-[#278256] text-white p-2 rounded-lg"
        >
          Send ETH
        </button>
      </div>
    </div>
  );
};

export default LockETH;

*/
