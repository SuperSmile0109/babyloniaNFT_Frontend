const web3Provider = "https://data-seed-prebsc-1-s1.binance.org:8545/";

// console.log(process.env.REACT_APP_NETWORK_ID)
const config = {
  web3Provider: web3Provider,
  networkId: 97,
  contractAddress: {
    babyToken: {
      56: "",
      97: "0x9F346285d1b2832A04dF8E1D6C055f8D18B34833",
      80001: "0x28cE54f8eBDE745D0A1a85Fd73b9ae8212ad399A",
      4: "0xed9ba81d068A8df68E3c44D1c7C276AF244356E9", 
      43113: "0x6d8787EA487Eb99633435E3ece87aD158c92D538"
    },
    presale: {
      56: "",
      97: "0xd2d46bdb4aBe10ed823697F68fEc1707D0B5D38C",
      80001: "0x0ED192F5D48dA6419f2E0Fd4F40c303708041F15",
      4: "0xc644B6949E03cD4f023268AfDf76d75560211669", 
      43113: "0xc3Ef8752569Fa34476C872df8a76A809c0BcA905"
    },
    busd: {
      56: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      97: "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee",
      80001: "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7",
      4: "0x4e2442A6f7AeCE64Ca33d31756B5390860BF973E", 
      43113: "0x8CC9c8660c1c44D92141f17367885Fd7efF6Daec"
    },
    usdt: {
      56: "0x55d398326f99059ff775485246999027b3197955",
      97: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
      80001: "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832", 
      4: "0x3B00Ef435fA4FcFF5C209a37d1f3dcff37c705aD", 
      43113: "0x82DCEC6aa3c8BFE2C96d40d8805EE0dA15708643"
    }, 
    usdc: {
      56: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      97: "0x69d973B14357C557E342055e3ba3c42830B3f5B5",
      80001: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747", 
      4: "0xeb8f08a975Ab53E34D8a0330E0D34de942C95926", 
      43113: "0xAF82969ECF299c1f1Bb5e1D12dDAcc9027431160"
    }
  },
};

export default config;