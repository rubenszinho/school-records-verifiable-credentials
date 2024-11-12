// SPDX-License-Identifier: MIT
// cert-blockchain/contracts/CertificateRegistry.sol
pragma solidity ^0.8.0;

contract CertificateRegistry {
    address public owner;

    mapping(address => bool) public authorizedIssuers;
    mapping(bytes32 => bool) public certificates;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyAuthorizedIssuer() {
        require(authorizedIssuers[msg.sender], "Not an authorized issuer");
        _;
    }

    function addAuthorizedIssuer(address issuer) public onlyOwner {
        authorizedIssuers[issuer] = true;
    }

    function issueCertificate(
        bytes32 certificateHash
    ) public onlyAuthorizedIssuer {
        certificates[certificateHash] = true;
    }

    function verifyCertificate(
        bytes32 certificateHash
    ) public view returns (bool) {
        return certificates[certificateHash];
    }
}
