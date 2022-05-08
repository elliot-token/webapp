import { RootState } from "..";

const getConnectedWallet = (state: RootState) => {
  return state.auth.connectedWallet;
};

const getWalletToSignUp = (state: RootState) => {
  return state.auth.walletToSignup;
};

const getCurrentUser = (state: RootState) => {
  return state.auth.user;
};

const AuthSelectors = {
  getConnectedWallet,
  getWalletToSignUp,
  getCurrentUser,
};

export default AuthSelectors;
