const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CertificateRegistry", function () {
  let CertificateRegistry, certificateRegistry, owner, issuer;

  beforeEach(async function () {
    [owner, issuer] = await ethers.getSigners();
    CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
    certificateRegistry = await CertificateRegistry.deploy();

    await certificateRegistry.deploymentTransaction().wait();
  });

  it("should allow the owner to add an authorized issuer", async function () {
    await certificateRegistry.connect(owner).addAuthorizedIssuer(issuer.address);
    const isAuthorized = await certificateRegistry.authorizedIssuers(issuer.address);
    expect(isAuthorized).to.equal(true);
  });

  it("should allow an authorized issuer to issue a certificate", async function () {
    await certificateRegistry.connect(owner).addAuthorizedIssuer(issuer.address);
    const certificateHash = ethers.keccak256(ethers.toUtf8Bytes("Unique Certificate Data"));
    await certificateRegistry.connect(issuer).issueCertificate(certificateHash);
    const exists = await certificateRegistry.verifyCertificate(certificateHash);
    expect(exists).to.equal(true);
  });
});
