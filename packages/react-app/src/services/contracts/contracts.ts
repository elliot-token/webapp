import { ethers, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import betAbi from "./bet-abi.json";
import tokenAbi from "./token-abi.json";

const ADDRESSES = {
  localhost: {
    token: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
    bet: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
  },
  kovan: {
    token: "0x3C66C78D941128BddC918b4c901C954b5099EAA0",
    bet: "0x3DceF116E08580985Bb1E53AE756b5390bA2A5E8",
  },
};

const CHAIN_NETWORK = "localhost";

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
export { betContract, tokenContract };
