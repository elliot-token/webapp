import { ethers, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import betAbi from "./bet-abi.json";
import tokenAbi from "./token-abi.json";
import { Provider } from "@ethersproject/providers";

const wethInterface = new utils.Interface(JSON.stringify(betAbi.abi));
console.log(wethInterface);
const wethContractAddress = "0xC863fCeC6a0edb962df2881e15D87F9C1834314D";
/* @ts-ignore */
const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const betContract = new Contract(wethContractAddress, wethInterface, signer);
const tokenContract = new Contract(
  "0x3C66C78D941128BddC918b4c901C954b5099EAA0",
  new utils.Interface(JSON.stringify(tokenAbi.abi)),
  signer
);
export { betContract, tokenContract };
