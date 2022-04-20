const web3Provider = "https://data-seed-prebsc-1-s1.binance.org:8545/";

// console.log(process.env.REACT_APP_NETWORK_ID)
const config = {
  web3Provider: web3Provider,
  networkId: 97,
  contractAddress: {
    babyToken: {
      56: "",
      97: "0xeA3B1C3CE9a168f5AF6F9B8E1B4E65B7f727eCa0",
    },
    presale: {
      56: "",
      97: "0x3cc4E0529753D4c9061179796EC50EC00D3fE87C"
    },
    busd: {
      56: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      97: "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee",
    },
  },
};

module.exports = config;
