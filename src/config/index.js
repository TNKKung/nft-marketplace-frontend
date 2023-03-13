const CONTRACT_ADDRESS = "0x985F253fB2F1b47acAAA6fcdc1D00178f7E7B207";
const Market_ADDRESS = "0xe4876D177a6aDf402fAD2af19a9EB057F462Ef28";

// const baseUrl = "http://localhost:4000";

const blockchainName = "Sepolia";
const chainID = "0xaa36a7";

module.exports = {
  baseUrl:
    "https://us-central1-nft-marketplace-frontend.cloudfunctions.net/app/v1",
  CONTRACT_ADDRESS,
  blockchainName,
  chainID,
  Market_ADDRESS,
  jwtSecretKey: process.env.REACT_APP_JWT_SECRET_KEY,
};
