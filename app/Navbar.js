"use client";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ConnectWallet from "./components/ConnectWallet";

const Navbar = ({ connectWallet, account }) => {
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for transaction hash/amount/address"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#35af74] hover:bg-[#278256] flex justify-center items-center cursor-pointer">
          <SearchIcon style={{ color: "white", fontSize: "25px" }} />
        </div>
      </div>
      <div className="p-3 bg-[#35af74] text-white text-base rounded-xl shadow-md hover:bg-[#278256] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition ease-in-out duration-300 cursor-pointer">
        view transactions
      </div>
      <div className="p-3 bg-[#35af74] text-white text-base rounded-xl shadow-md hover:bg-[#278256] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition ease-in-out duration-300 cursor-pointer">
        <ConnectWallet account={account} connectWallet={connectWallet} />
      </div>
    </div>
  );
};

export default Navbar;
