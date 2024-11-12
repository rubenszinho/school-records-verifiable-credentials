const { ethers } = require("hardhat");

async function main() {
    const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
    const certificateRegistry = await CertificateRegistry.deploy();
    await certificateRegistry.deploymentTransaction().wait();

    console.log("CertificateRegistry deployed to:", await certificateRegistry.getAddress());

    const certificateData = "Unique Certificate Data";
    const certificateHash = ethers.keccak256(ethers.toUtf8Bytes(certificateData));
    console.log("Generated Certificate Hash:", certificateHash);

    const [owner, issuer] = await ethers.getSigners();
    await certificateRegistry.addAuthorizedIssuer(await issuer.getAddress());
    console.log("Authorized issuer:", await issuer.getAddress());

    await certificateRegistry.connect(issuer).issueCertificate(certificateHash);
    console.log("Certificate issued with hash:", certificateHash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error in deployment script:", error);
        process.exit(1);
    });
