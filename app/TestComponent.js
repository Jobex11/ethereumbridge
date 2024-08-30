"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function TestComponent() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [ethAmount, setEthAmount] = useState("");
  const [thorchainAddress, setThorchainAddress] = useState("");
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
  const contractABI = [
    // ABI details from your compiled contract
  ];

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        provider.send("eth_requestAccounts", []).then(() => {
          provider
            .getSigner()
            .getAddress()
            .then((address) => {
              setAccount(address);
              loadContract(provider);
            });
        });
      } catch (error) {
        console.error("Error initializing provider:", error);
      }
    } else {
      console.log("Ethereum object not found");
    }
  }, []);

  const loadContract = async (provider) => {
    try {
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(contractInstance);

      const adminAddress = await contractInstance.admin();
      setAdmin(adminAddress);

      const whitelistedStatus = await contractInstance.isWhitelisted(account);
      setIsWhitelisted(whitelistedStatus);
    } catch (error) {
      console.error("Error loading contract:", error);
    }
  };

  const lockETH = async () => {
    if (!ethAmount || !thorchainAddress) return;
    setIsLoading(true);

    try {
      const tx = await contract.lockETH(
        thorchainAddress,
        ethers.utils.parseEther(ethAmount),
        {
          value: ethers.utils.parseEther(ethAmount),
        }
      );
      await tx.wait();
      alert("ETH locked successfully for RUNE!");
    } catch (error) {
      console.error("Transaction failed!", error);
      alert("Transaction failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const withdrawETH = async () => {
    if (account !== admin) return;
    setIsLoading(true);

    try {
      const tx = await contract.withdrawETH();
      await tx.wait();
      alert("ETH withdrawn successfully!");
    } catch (error) {
      console.error("Transaction failed!", error);
      alert("Transaction failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const transferAdmin = async (newAdmin) => {
    if (account !== admin || !newAdmin) return;
    setIsLoading(true);

    try {
      const tx = await contract.transferAdmin(newAdmin);
      await tx.wait();
      alert("Admin rights transferred successfully!");
    } catch (error) {
      console.error("Transaction failed!", error);
      alert("Transaction failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWhitelist = async () => {
    if (account !== admin) return;
    setIsLoading(true);

    try {
      const tx = await contract.setWhitelisted(account, !isWhitelisted);
      await tx.wait();
      alert("Whitelist status changed successfully!");
      setIsWhitelisted(!isWhitelisted);
    } catch (error) {
      console.error("Transaction failed!", error);
      alert("Transaction failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ethereum to Thorchain Bridge</h1>
      <p>Connected Account: {account || "Not connected"}</p>

      {account && (
        <>
          <div>
            <h3>Lock ETH for RUNE</h3>
            <input
              type="text"
              placeholder="Thorchain Address"
              value={thorchainAddress}
              onChange={(e) => setThorchainAddress(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <input
              type="text"
              placeholder="Amount in ETH"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
            />
            <button onClick={lockETH} disabled={isLoading}>
              {isLoading ? "Processing..." : "Lock ETH"}
            </button>
          </div>

          {account === admin && (
            <>
              <div style={{ marginTop: "20px" }}>
                <h3>Admin Actions</h3>
                <button onClick={withdrawETH} disabled={isLoading}>
                  {isLoading ? "Processing..." : "Withdraw ETH"}
                </button>
              </div>

              <div style={{ marginTop: "20px" }}>
                <h3>Transfer Admin Rights</h3>
                <input
                  type="text"
                  placeholder="New Admin Address"
                  onChange={(e) => transferAdmin(e.target.value)}
                />
                <button disabled={isLoading}>
                  {isLoading ? "Processing..." : "Transfer Admin"}
                </button>
              </div>

              <div style={{ marginTop: "20px" }}>
                <h3>Whitelist Account</h3>
                <button onClick={toggleWhitelist} disabled={isLoading}>
                  {isLoading
                    ? "Processing..."
                    : `Set Whitelisted: ${!isWhitelisted}`}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
