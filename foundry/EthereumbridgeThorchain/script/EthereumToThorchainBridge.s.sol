// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/EthereumToThorchainBridge.sol";

contract DeployEthereumToThorchainBridge is Script {
    function run() external {
        // Start broadcasting the deployment transaction
        // Use a specific network ID if needed, e.g., Network.MAINNET
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the contract
        EthereumToThorchainBridge bridge = new EthereumToThorchainBridge();

        // Stop broadcasting the deployment transaction
        vm.stopBroadcast();

        // Print the deployed contract address
        console.log("EthereumToThorchainBridge deployed to:", address(bridge));
    }
}
