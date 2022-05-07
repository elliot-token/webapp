import { ethers } from "ethers";
import Web3Token from "web3-token";
import axios, { AxiosError } from "axios";

const generateToken = async () => {
  /* @ts-ignore */
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  /* @ts-ignore */
  const token = await Web3Token.sign(
    async (msg: string) => await signer.signMessage(msg),
    "1d"
  );
  console.log(token);
  /* @ts-ignore */
  const { address } = await Web3Token.verify(token);

  return {
    address,
    token,
  } as {
    address: string;
    token: string;
  };
};

export namespace APITypes {
  export type User = {
    walletId: string;
  };
}

const ELLIOT_API = "https://elliot-api-service-ventilateur.cloud.okteto.net";

const checkUserByWalletId = async (walletId: string) => {
  let response;
  try {
    response = await axios.get<APITypes.User>(
      `${ELLIOT_API}/api/v1/users/${walletId}`
    );
  } catch (e) {
    if ((e as AxiosError).response?.status === 404) {
      return false;
    }
    throw e;
  }
  return response.data;
};

const API = {
  generateToken,
  checkUserByWalletId,
};

export default API;
