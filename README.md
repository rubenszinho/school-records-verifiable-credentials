# Blockchain-based Digital Certificate Issuance with Verifiable Credentials

## Project Overview

This project implements a secure, blockchain-based system for issuing and verifying digital certificates using Verifiable Credentials (VCs). Designed to address issues of academic fraud, the system ensures that certificates are authentic, immutable, and easily verifiable through a decentralized process.

## Features

- **Issuer Authorization**: Only authorized entities can issue certificates.
- **Certificate Issuance**: Generates a unique, immutable hash for each certificate and stores it on the blockchain.
- **Certificate Verification**: Allows users to verify the authenticity of a certificate using its hash.

## Tools and Technologies

- **Blockchain**: Ganache (local blockchain for development and testing)
- **Smart Contracts**: Solidity, deployed using Hardhat
- **Frontend**: React for the user interface
- **MetaMask**: Ethereum wallet integration for blockchain transactions
- **Ethers.js**: For communication between the frontend and the blockchain

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/certificate-blockchain-project.git
   cd certificate-blockchain-project
   ```

2. **Install Dependencies**:
   Navigate to both the `cert-blockchain` and `cert-frontend` directories and install the required dependencies.
   ```bash
   # Inside cert-blockchain directory
   npm install

   # Inside cert-frontend directory
   npm install
   ```

3. **Run Ganache**:
   Start Ganache to use as your local blockchain for deploying and interacting with contracts.

4. **Deploy Contracts**:
   Deploy the smart contract to Ganache using Hardhat.
   ```bash
   npx hardhat run scripts/deploy.js --network ganache
   ```

5. **Start Frontend**:
   Run the frontend app with React.
   ```bash
   cd cert-frontend
   npm start
   ```

6. **Configure MetaMask**:
   Add Ganache to MetaMask as a custom network:
   - **Network Name**: Ganache
   - **New RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: 1337
   - **Currency Symbol**: ETH

   Import Ganache accounts to MetaMask for testing.

## Usage

1. **Authorize an Issuer**: Input an Ethereum address to authorize it as a certificate issuer.
2. **Issue Certificate**: Enter certificate data to generate and store a unique hash on the blockchain.
3. **Verify Certificate**: Enter the certificate hash to confirm its validity and authenticity.

## Future Enhancements

- **Revocation Functionality**: Implementing certificate revocation for flexibility.
- **Public Blockchain Deployment**: Transition to a public blockchain for wider accessibility.
- **Integration with DID and VCs Standards**: Adding support for W3C Verifiable Credentials and Decentralized Identifiers (DIDs).