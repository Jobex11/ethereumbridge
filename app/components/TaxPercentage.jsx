"use client";
import React, { useEffect } from "react";

const TaxPercentage = ({ web3, contract, taxPercentage, setTaxPercentage }) => {
  const getTaxPercentage = async () => {
    if (!web3 || !contract) return;

    try {
      const tax = await contract.methods.TAX_PERCENTAGE().call();
      setTaxPercentage(web3.utils.fromWei(tax, "ether"));
    } catch (error) {
      console.error("Error fetching tax percentage:", error);
    }
  };

  useEffect(() => {
    getTaxPercentage();
  }, [web3, contract]);

  return (
    <div>
      {taxPercentage !== null && (
        <div>
          <h4>Tax Percentage</h4>
          <p>{taxPercentage} ETH</p>
        </div>
      )}
    </div>
  );
};

export default TaxPercentage;
