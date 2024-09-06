import React, { useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";

const WhitelistAddress = ({ web3, account, contract, onActionClick }) => {
  const [whitelistAddress, setWhitelistAddress] = useState("");

  const addToWhitelist = async () => {
    if (!web3 || !account) {
      onActionClick(); // Show the modal if the wallet is not connected
      return;
    }

    if (!contract) {
      console.error("Contract is not available");
      return;
    }

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
    <div className="space-x-0 md:space-x-4 md:text-center">
      <h4 className="text-sm">
        Add to Whitelist (address that will not pay 2.5% charges)
      </h4>
      <input
        type="text"
        placeholder="Address to Whitelist"
        value={whitelistAddress}
        onChange={(e) => setWhitelistAddress(e.target.value)}
        className="p-2 border rounded text-gray-800 text-base"
      />
      <button
        onClick={addToWhitelist}
        className="bg-main hover:bg-[#278256] text-white p-2 rounded-lg mt-2"
      >
        <VerifiedIcon /> Add to Whitelist
      </button>
    </div>
  );
};

export default WhitelistAddress;

/*
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
    <div className="space-x-4 text-center">
      <h4 className="text-sm">
        Add to Whitelist (address that will not pay 2.5% charges )
      </h4>
      <input
        type="text"
        placeholder="Address to Whitelist"
        value={whitelistAddress}
        onChange={(e) => setWhitelistAddress(e.target.value)}
        className="p-2 border rounded"
      />
      <button
        onClick={addToWhitelist}
        className="bg-main hover:bg-[#278256] text-white p-2 rounded-lg mt-2"
      >
        Add to Whitelist
      </button>
    </div>
  );
};

export default WhitelistAddress;

*/
