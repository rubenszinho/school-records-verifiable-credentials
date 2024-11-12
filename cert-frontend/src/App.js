import React, { useState } from 'react';
import { ethers } from 'ethers';
import CertificateRegistry from './artifacts/contracts/CertificateRegistry.json';

const contractAddress = "0x93B51139925487634a1C4e727474daFa27DF57bF"; // Replace with your deployed contract address

function App() {
  const [status, setStatus] = useState("");
  const [hash, setHash] = useState("");
  const [certificateData, setCertificateData] = useState("Unique Certificate Data");
  const [issuerAddress, setIssuerAddress] = useState("");

  // Connect to contract with a signer for write operations
  const getContractWithSigner = async () => {
    if (!window.ethereum) {
      setStatus("MetaMask is not detected. Please install MetaMask.");
      return null;
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(); // Use a signer to send transactions
    return new ethers.Contract(contractAddress, CertificateRegistry.abi, signer);
  };

  // Connect to contract with a provider for read-only functions
  const getContractWithProvider = async () => {
    if (!window.ethereum) {
      setStatus("MetaMask is not detected. Please install MetaMask.");
      return null;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(contractAddress, CertificateRegistry.abi, provider);
  };

  // Authorize an issuer (write function)
  const authorizeIssuer = async () => {
    try {
      const contract = await getContractWithSigner();
      if (!contract) return;

      // Validate that issuerAddress is a valid Ethereum address
      if (!ethers.isAddress(issuerAddress.trim())) {
        setStatus("Invalid Ethereum address format.");
        return;
      }

      // Call addAuthorizedIssuer with a properly formatted address
      await contract.addAuthorizedIssuer(issuerAddress.trim());
      setStatus(`Issuer ${issuerAddress} authorized successfully.`);
    } catch (err) {
      console.error("Error authorizing issuer:", err);
      setStatus("Error authorizing issuer.");
    }
  };

  // Issue a certificate (write function)
  const issueCertificate = async () => {
    try {
      const contract = await getContractWithSigner();
      if (!contract) return;

      // Generate a bytes32 hash from certificate data using ethers.id
      const certificateHash = ethers.id(certificateData); // Consistent with Hardhat console
      await contract.issueCertificate(certificateHash);
      setHash(certificateHash); // Store this for verification
      setStatus(`Certificate issued with hash: ${certificateHash}`);
    } catch (err) {
      console.error("Error issuing certificate:", err);
      setStatus("Error issuing certificate.");
    }
  };

  // Verify a certificate (read function)
  const verifyCertificate = async () => {
    try {
      const contract = await getContractWithProvider(); // No signer needed for read-only
      if (!contract) return;

      // Use the same hash as generated in issueCertificate
      const isValid = await contract.verifyCertificate(hash);
      setStatus(isValid ? "Certificate is valid." : "Certificate not found.");
    } catch (err) {
      console.error("Error verifying certificate:", err);
      setStatus("Error verifying certificate.");
    }
  };

  return (
    <div>
      <h1>Blockchain Certificate Management</h1>

      {/* Authorize Issuer */}
      <div>
        <h2>Authorize an Issuer</h2>
        <input
          type="text"
          value={issuerAddress}
          onChange={(e) => setIssuerAddress(e.target.value)}
          placeholder="Issuer Address"
        />
        <button onClick={authorizeIssuer}>Authorize Issuer</button>
      </div>

      {/* Issue Certificate */}
      <div>
        <h2>Issue Certificate</h2>
        <input
          type="text"
          value={certificateData}
          onChange={(e) => setCertificateData(e.target.value)}
          placeholder="Certificate Data"
        />
        <button onClick={issueCertificate}>Issue Certificate</button>
      </div>

      {/* Verify Certificate */}
      <div>
        <h2>Verify Certificate</h2>
        <input
          type="text"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          placeholder="Certificate Hash"
        />
        <button onClick={verifyCertificate}>Verify Certificate</button>
      </div>

      <p>Status: {status}</p>
    </div>
  );
}

export default App;
