# ETH-RUNE Gateway

Welcome to the ETH-RUNE Gateway, a decentralized bridge that facilitates the transfer of ETH (Ethereum) to RUNE, the native token of the Thorchain ecosystem.

## Project URL

You can view and interact with the ETH-RUNE Gateway at the following URL:

[ETH-RUNE Gateway](https://ethereumbridge.vercel.app/)

## Contact

For any inquiries or support, please reach out via email:

[Contact Us](mailto:joblawal33@gmail.com)

## Overview

The ETH-RUNE Gateway is designed to allow users to lock their Ethereum (ETH) on the Ethereum blockchain and mint an equivalent amount of RUNE on Thorchain. This bridge ensures that users can seamlessly transfer value between these two blockchain networks.

## How the Web3 Bridge Works

1. **Lock ETH on Ethereum**: Users send ETH to the smart contract on the Ethereum network. This ETH is locked in the contract, ensuring that it cannot be used elsewhere.

2. **Mint RUNE on Thorchain**: After the ETH is successfully locked, the corresponding amount of RUNE is minted on Thorchain. This process involves an off-chain oracle or relayer that monitors the Ethereum contract and initiates the minting of RUNE on Thorchain.

3. **Redeem ETH by Burning RUNE**: To move back to Ethereum, users burn their RUNE on Thorchain, which triggers the release of the locked ETH on the Ethereum side. This ensures a 1:1 pegged value between the ETH locked and the RUNE minted.

### Flow Diagram

The following image shows the flow of assets from Ethereum to Thorchain and vice versa:

![ETH to RUNE Flow](/assets/bridge2.png)

## Smart Contract Details

- **Ethereum Contract Address**: `0xYourEthereumContractAddress`
- **Thorchain Contract Address**: `YourThorchainContractDetails`

The Ethereum contract handles the locking of ETH and keeps track of the transactions. The corresponding RUNE minting occurs on Thorchain, coordinated by an off-chain mechanism.

## Usage

To use the ETH-RUNE Gateway, follow these steps:

1. **Connect your Wallet**: Make sure your wallet (e.g., MetaMask) is connected to the Ethereum network.
2. **Lock ETH**: Send the desired amount of ETH to the Ethereum contract using the provided UI or directly through the contract's `lockETH` function.
3. **Receive RUNE**: The corresponding RUNE will be minted and sent to your Thorchain address.
4. **Redeem ETH**: To redeem your ETH, burn the equivalent RUNE on Thorchain, and your ETH will be released from the Ethereum contract.
