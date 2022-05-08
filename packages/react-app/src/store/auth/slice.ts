import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APITypes } from "../../services/api";
import { indexReducer } from "../_helpers";

type AuthState = {
  walletToSignup?: string;
  connectedWallet?: string;
  authToken?: string;
  user?: APITypes.User;
};
const initialState: AuthState = {};

type AuthCaseReducer<T = undefined> = CaseReducer<AuthState, PayloadAction<T>>;
const loginRequest = indexReducer;

const loginSuccess: AuthCaseReducer<{
  walletAddress: string;
  authToken: string;
  user: APITypes.User;
}> = (state, action) => {
  state.connectedWallet = action.payload.walletAddress;
  state.authToken = action.payload.authToken;
  state.user = action.payload.user;
};

const logoutRequest: AuthCaseReducer = (state) => {
  state.user = undefined;
};

const signupRequest: AuthCaseReducer<{ walletAddress: string }> = (
  state,
  action
) => {
  state.walletToSignup = action.payload.walletAddress;
};

const signupSuccess: AuthCaseReducer<APITypes.User> = (state, action) => {
  state.walletToSignup = undefined;
  state.connectedWallet = action.payload.walletAddress;
  state.user = action.payload;
};

const { reducer: AuthReducer, actions: AuthActions } = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginRequest,
    logoutRequest,
    loginSuccess,
    signupRequest,
    signupSuccess,
  },
});

export { AuthReducer, AuthActions };
