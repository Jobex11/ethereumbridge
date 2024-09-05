"use client";
import React, { useState } from "react";

const TransferOwnership = ({ web3, account, contract }) => {
  const [newOwner, setNewOwner] = useState("");

  const transferOwnership = async () => {
    if (!web3 || !account) return;

    try {
      await contract.methods.transferAdmin(newOwner).send({ from: account });
      console.log("Ownership transferred");
    } catch (error) {
      console.error("Error transferring ownership:", error);
    }
  };

  return (
    <div className="space-x-4 text-center">
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
        className="bg-main text-white p-2 rounded-lg mt-2"
      >
        Transfer Ownership
      </button>
    </div>
  );
};

export default TransferOwnership;
