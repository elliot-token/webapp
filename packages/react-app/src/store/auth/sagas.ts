import API from "services/api";
import { AuthActions } from "./slice";
import { call, takeLeading, put } from "../typed-saga";
import history from "core/history";

function* login() {
  const { address, token } = yield* call(API.generateToken);
  const userExists = yield* call(API.checkUserByWalletId, address);

  if (userExists) {
    yield put(
      AuthActions.loginSuccess({
        walletAddress: address,
        authToken: token,
        user: userExists,
      })
    );
  } else {
    console.log("toto");
    yield put(
      AuthActions.signupRequest({
        walletAddress: address,
        authToken: token,
      })
    );
    history.push("signup");
  }
}

const AuthSagas = [takeLeading(AuthActions.loginRequest, login)];

export default AuthSagas;
