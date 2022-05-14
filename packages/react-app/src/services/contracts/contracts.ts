import { ethers, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import abi from "./abi.json";
import { Provider } from "@ethersproject/providers";

const wethInterface = new utils.Interface(JSON.stringify(abi.abi));
console.log(wethInterface);
const wethContractAddress = "0xAA9122DF97E890990FD95115Df73aC90Fcc49604";
/* @ts-ignore */
const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const betContract = new Contract(wethContractAddress, wethInterface, signer);

export { betContract };
