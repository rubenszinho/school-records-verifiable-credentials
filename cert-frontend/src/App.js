import './App.css';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import CertificateRegistry from './artifacts/contracts/CertificateRegistry.json';

const contractAddress = "CONTRACT_ADDRESS";

function App() {
  const [status, setStatus] = useState("");
  const [hash, setHash] = useState("");
  const [certificateData, setCertificateData] = useState("Unique Certificate Data");
  const [issuerAddress, setIssuerAddress] = useState("");

  const getContractWithSigner = async () => {
    if (!window.ethereum) {
      setStatus("MetaMask is not detected. Please install MetaMask.");
      return null;
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, CertificateRegistry.abi, signer);
  };

  const getContractWithProvider = async () => {
    if (!window.ethereum) {
      setStatus("MetaMask is not detected. Please install MetaMask.");
      return null;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(contractAddress, CertificateRegistry.abi, provider);
  };

  const authorizeIssuer = async () => {
    try {
      const contract = await getContractWithSigner();
      if (!contract) return;

      if (!ethers.isAddress(issuerAddress.trim())) {
        setStatus("Invalid Ethereum address format.");
        return;
      }

      await contract.addAuthorizedIssuer(issuerAddress.trim());
      setStatus(`Issuer ${issuerAddress} authorized successfully.`);
    } catch (err) {
      console.error("Error authorizing issuer:", err);
      setStatus("Error authorizing issuer.");
    }
  };

  const issueCertificate = async () => {
    try {
      const contract = await getContractWithSigner();
      if (!contract) return;
      const certificateHash = ethers.id(certificateData);
      await contract.issueCertificate(certificateHash);
      setHash(certificateHash);
      setStatus(`Certificate issued with hash: ${certificateHash}`);
    } catch (err) {
      console.error("Error issuing certificate:", err);
      setStatus("Error issuing certificate.");
    }
  };

  const verifyCertificate = async () => {
    try {
      const contract = await getContractWithProvider();
      if (!contract) return;

      const isValid = await contract.verifyCertificate(hash);
      setStatus(isValid ? "Certificate is valid." : "Certificate not found.");
    } catch (err) {
      console.error("Error verifying certificate:", err);
      setStatus("Error verifying certificate.");
    }
  };

  return (
    <div className="container">
      <h1>Blockchain Certificate Management</h1>

      <div className="section">
        <h2>Authorize an Issuer</h2>
        <input
          type="text"
          value={issuerAddress}
          onChange={(e) => setIssuerAddress(e.target.value)}
          placeholder="Issuer Address"
        />
        <button onClick={authorizeIssuer}>Authorize Issuer</button>
      </div>

      <div className="section">
        <h2>Issue Certificate</h2>
        <input
          type="text"
          value={certificateData}
          onChange={(e) => setCertificateData(e.target.value)}
          placeholder="Certificate Data"
        />
        <button onClick={issueCertificate}>Issue Certificate</button>
      </div>

      <div className="section">
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
