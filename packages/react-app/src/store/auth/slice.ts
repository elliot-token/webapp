import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APITypes } from "../../services/api";
import { indexReducer } from "../_helpers";

type AuthState = {
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
