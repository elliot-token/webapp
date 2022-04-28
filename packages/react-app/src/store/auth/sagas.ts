import API from "../../services/api";
import { AuthActions } from "./slice";
import { call, takeLeading, put } from "../typed-saga";

function* login() {
  const { address, token } = yield call(API.signup);
  console.log(address);
  yield put(
    AuthActions.loginSuccess({
      walletAddress: address,
      authToken: token,
    })
  );
}

const AuthSagas = [takeLeading(AuthActions.loginRequest, login)];

export default AuthSagas;
