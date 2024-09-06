import React from "react";

const WithdrawETH = ({ web3, account, contract, onActionClick }) => {
  const withdrawETH = async () => {
    if (!web3 || !account) {
      onActionClick(); // Show the modal if the wallet is not connected
      return;
    }

    try {
      await contract.methods.withdrawETH().send({ from: account });
      console.log("Withdrawal successful");
    } catch (error) {
      console.error("Error withdrawing ETH:", error);
    }
  };

  return (
    <div>
      <h4 className="text-sm">Withdraw ETH to your Ethereum address</h4>
      <button
        onClick={withdrawETH}
        className="bg-main hover:bg-[#278256] text-white p-2 rounded-lg"
      >
        Withdraw
      </button>
    </div>
  );
};

export default WithdrawETH;

/*
"use client";
import React from "react";

const WithdrawETH = ({ web3, account, contract }) => {
  const withdrawETH = async () => {
    if (!web3 || !account || !contract) return;

    try {
      await contract.methods.withdrawETH().send({ from: account });
      console.log("Withdrawal successful");
    } catch (error) {
      console.error("Error withdrawing ETH:", error);
    }
  };

  return (
    <div>
      <h4 className="text-sm">Withdraw ETH to your Ethereum address</h4>
      <button
        onClick={withdrawETH}
        className="bg-main hover:bg-[#278256] text-white p-2 rounded-lg"
      >
        Withdraw
      </button>
    </div>
  );
};

export default WithdrawETH;

*/
