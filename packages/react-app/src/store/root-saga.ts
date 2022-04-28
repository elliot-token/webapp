import { all, spawn, call, delay } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import errorReporter from "../core/error-reporter";
import { AuthSagas } from "./auth";

const sagasList = [...AuthSagas];

function* rootSaga() {
  yield all([
    ...sagasList.map((saga) =>
      spawn(function*() {
        while (true) {
          try {
            yield call(function*() {
              yield saga;
            });
            break;
          } catch (e) {
            errorReporter.report(e);
            delay(500);
          }
        }
      })
    ),
  ]);
}

const sagaMiddleware = createSagaMiddleware({
  onError(error: Error) {
    errorReporter.report(error);
  },
});

const runSaga = () => {
  sagaMiddleware.run(rootSaga);
};

export { sagaMiddleware, runSaga };
