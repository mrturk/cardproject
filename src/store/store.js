import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import rootReducer from "./Reducers/index";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "categories", "localization"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, logger)
);
export const persistor = persistStore(store);
