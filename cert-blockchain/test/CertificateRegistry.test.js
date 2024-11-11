const CertificateRegistry = artifacts.require("CertificateRegistry");

contract("CertificateRegistry", (accounts) => {
    const owner = accounts[0];
    const issuer = accounts[1];
    const certificateHash = web3.utils.keccak256("Unique Certificate Data");

    it("should allow the owner to add an authorized issuer", async () => {
        const instance = await CertificateRegistry.deployed();
        await instance.addAuthorizedIssuer(issuer, { from: owner });
        const isAuthorized = await instance.authorizedIssuers(issuer);
        assert.isTrue(isAuthorized, "Issuer should be authorized");
    });

    it("should allow an authorized issuer to issue a certificate", async () => {
        const instance = await CertificateRegistry.deployed();
        await instance.issueCertificate(certificateHash, { from: issuer });
        const exists = await instance.verifyCertificate(certificateHash);
        assert.isTrue(exists, "Certificate should be issued and verifiable");
    });
});
