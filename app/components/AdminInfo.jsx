"use client";
import React, { useEffect } from "react";

const AdminInfo = ({ web3, contract, admin, setAdmin }) => {
  const getAdmin = async () => {
    if (!web3) return;

    try {
      const adminAddress = await contract.methods.admin().call();
      setAdmin(adminAddress);
    } catch (error) {
      console.error("Error fetching admin address:", error);
    }
  };

  useEffect(() => {
    if (web3) {
      getAdmin();
    }
  }, [web3]);

  return (
    <div>
      {admin && (
        <div>
          <h4>Current Admin Address</h4>
          <p className="text-xs font-bold md:font-normal md:text-base">
            {admin}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminInfo;
