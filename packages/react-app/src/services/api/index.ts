import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import Web3Token from "web3-token";

const signup = async () => {
  /* @ts-ignore */
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  /* @ts-ignore */
  const token = await Web3Token.sign(
    async (msg: string) => await signer.signMessage(msg),
    "1d"
  );
  /* @ts-ignore */
  const { address } = await Web3Token.verify(token);

  return {
    address,
    token,
  };
};

const checkWallet = async (walletId: string) => {
  return false;
};

const API = {
  signup,
};

export default API;
