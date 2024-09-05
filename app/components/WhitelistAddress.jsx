"use client";
import React, { useState } from "react";

const WhitelistAddress = ({ web3, account, contract }) => {
  const [whitelistAddress, setWhitelistAddress] = useState("");

  const addToWhitelist = async () => {
    if (!web3 || !account || !contract) return;

    try {
      await contract.methods
        .setWhitelisted(whitelistAddress, true)
        .send({ from: account });
      console.log("Address added to whitelist");
    } catch (error) {
      console.error("Error adding address to whitelist:", error);
    }
  };

  return (
    <div>
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
  );
};

export default WhitelistAddress;
