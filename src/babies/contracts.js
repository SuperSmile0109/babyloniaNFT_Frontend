import { web3 } from "./web3";
import config from "../config";

import presaleContractJSON from "./abis/Presale.json";
import tokenJSON from "./abis/BABYToken.json";
import busdJSON from "./abis/BUSDToken.json";

const networkId = config.networkId;

const tokenContractAddress = config.contractAddress.babyToken[networkId];
const ITokenContract = new web3.eth.Contract(
  tokenJSON.abi,
  tokenContractAddress
);

const presaleContractAddress = config.contractAddress.presale[networkId];
const IPresaleContractAddress = new web3.eth.Contract(
  presaleContractJSON.abi,
  presaleContractAddress
);

const busdContractAddress = config.contractAddress.busd[networkId];
const IBusdContractAddress = new web3.eth.Contract(
  busdJSON,
  busdContractAddress
);
const tokenContract = {
  address: tokenContractAddress,
  abi: tokenJSON.abi,
  contract: ITokenContract,
  decimals: 18,
};

const presaleContract = {
  address: presaleContractAddress,
  abi: presaleContractJSON.abi,
  contract: IPresaleContractAddress,
};

const busdContract = {
  address: busdContractAddress,
  abi: busdJSON,
  contract: IBusdContractAddress,
  decimals: 18,
};

export { networkId, tokenContract, presaleContract, busdContract };
