"use client";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ConnectWallet from "./components/ConnectWallet";
import CryptoKingIcon from "./components/CryptoKingIcon";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Menu Icon for opening the nav bar
import CloseIcon from "@mui/icons-material/Close"; // Optional: Close icon to close the nav bar
import Link from "next/link";

import WalletIcon from "@mui/icons-material/Wallet";
const Navbar = ({ connectWallet, account }) => {
  const [open, setOpen] = useState(false);

  const toggleNav = () => {
    setOpen(!open);
  };

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
      {!account && (
        <div className="md:hidden text-center mb-0 md:mb-4 text-gray-300">
          <p>
            Welcome to Eth-Rune Gateway, kindly connect your Web3 <WalletIcon />
            wallet.
          </p>
          <p>we ease the exchange of your Ethers to Rune</p>
        </div>
      )}
      <div className="md:hidden font-bold mb-4 flex items-center justify-center p-2 rounded-xl bg-[#1c1c24]">
        <div className="h-[50px] w-[50px]">
          <CryptoKingIcon />
        </div>
        <h3 className="text-2xl text-main">
          Eth-<span className="text-gray-200">Rune</span> Gateway
        </h3>
      </div>
      {/* nav bar */}
      <div className="md:hidden">
        {/* Menu Icon to open the full-screen navigation */}
        <IconButton onClick={toggleNav}>
          <MenuIcon fontSize="large" className="text-main" /> {/* Menu Icon */}
        </IconButton>

        {/* Full-Screen Navigation */}
        {open && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center w-screen h-screen">
            {/* Close Icon */}
            <IconButton
              className="absolute top-4 right-4 text-main"
              onClick={toggleNav}
            >
              <CloseIcon fontSize="large" />
            </IconButton>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-8 text-center">
              <Link href="/" className="text-white text-3xl ">
                Home
              </Link>
              <Link href="#about" className="text-white text-3xl ">
                View Transactions
              </Link>
              <Link href="#services" className="text-white text-3xl ">
                Get Info
              </Link>
              <Link href="#contact" className="text-white text-3xl ">
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
