"use client";
import React from "react";
const WithdrawETH = ({ web3, account, contract }) => {
  const burnRune = async () => {
    if (!web3 || !account) return;

    try {
      await contract.methods.burnRune().send({ from: account });
      console.log("Withdrawal successful");
    } catch (error) {
      console.error("Error withdrawing ETH:", error);
    }
  };

  return (
    <div>
      <h4 className="text-sm">
        withdraw the rune back to as Eth to your ethereum address
      </h4>
      <button onClick={burnRune} className="bg-main text-white p-2 rounded-lg">
        Widthraw
      </button>
    </div>
  );
};

export default WithdrawETH;
