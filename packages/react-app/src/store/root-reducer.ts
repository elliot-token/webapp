import { combineReducers } from "redux";
import { AuthReducer } from "./auth";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  auth: AuthReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
