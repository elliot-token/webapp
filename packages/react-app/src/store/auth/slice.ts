import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { indexReducer } from "../_helpers";

type AuthState = {
  connectedWallet?: string;
  authToken?: string;
};
const initialState: AuthState = {};

type AuthCaseReducer<T = undefined> = CaseReducer<AuthState, PayloadAction<T>>;
const loginRequest = indexReducer;

const loginSuccess: AuthCaseReducer<{
  walletAddress: string;
  authToken: string;
}> = (state, action) => {
  state.connectedWallet = action.payload.walletAddress;
  state.authToken = action.payload.authToken;
};

const logoutRequest: AuthCaseReducer = (state) => {
  state.connectedWallet = undefined;
};

const { reducer: AuthReducer, actions: AuthActions } = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginRequest,
    logoutRequest,
    loginSuccess,
  },
});

export { AuthReducer, AuthActions };
