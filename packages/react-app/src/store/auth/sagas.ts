import API from "../../services/api";
import { AuthActions } from "./slice";
import { call, takeLeading, put } from "../typed-saga";

function* login() {
  const { address, token } = yield* call(API.generateToken);
  console.log(address);
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
  }
}

const AuthSagas = [takeLeading(AuthActions.loginRequest, login)];

export default AuthSagas;
