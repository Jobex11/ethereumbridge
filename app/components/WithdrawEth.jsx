"use client";
import React from "react";

const WithdrawETH = ({ web3, account, contract }) => {
  const withdrawETH = async () => {
    if (!web3 || !account) return;

    try {
      await contract.methods.withdrawETH().send({ from: account });
      console.log("Withdrawal successful");
    } catch (error) {
      console.error("Error withdrawing ETH:", error);
    }
  };

  return (
    <div>
      <h4>Withdraw ETH</h4>
      <button
        onClick={withdrawETH}
        className="bg-primary text-white p-2 rounded-lg"
      >
        Withdraw ETH
      </button>
    </div>
  );
};

export default WithdrawETH;
