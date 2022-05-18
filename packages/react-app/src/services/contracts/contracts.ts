import { ethers, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import betAbi from "./bet-abi.json";
import tokenAbi from "./token-abi.json";

const ADDRESSES = {
  localhost: {
    token: "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d",
    bet: "0x59b670e9fA9D0A427751Af201D676719a970857b",
  },
  kovan: {
    token: "0x57De2d595c308E92d1858231C474a6f215A5C7E8",
    bet: "0x56Bc857011e0f55c8E97bcC2201682b3E5936716",
  },
};

const CHAIN_NETWORK = "kovan";

const chainAddresses = ADDRESSES[CHAIN_NETWORK];

const wethInterface = new utils.Interface(JSON.stringify(betAbi.abi));

/* @ts-ignore */
const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const betContract = new Contract(chainAddresses.bet, wethInterface, signer);
const tokenContract = new Contract(
  chainAddresses.token,
  new utils.Interface(JSON.stringify(tokenAbi.abi)),
  signer
);
export { betContract, tokenContract, chainAddresses };
