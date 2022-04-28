import { RootState } from "..";

const getConnectedWallet = (state: RootState) => {
  return state.auth.connectedWallet;
};

const AuthSelectors = {
  getConnectedWallet,
};

export default AuthSelectors;
