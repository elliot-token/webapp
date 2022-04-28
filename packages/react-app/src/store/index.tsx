import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./root-reducer";
import { runSaga, sagaMiddleware } from "./root-saga";

const customMiddlewares = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    immutableCheck: true,
    serializableCheck: true,
  }).concat(customMiddlewares),
});

const persistor = persistStore(store);

runSaga();

export type RootState = ReturnType<typeof store.getState>;

export { persistor };
export default store;
