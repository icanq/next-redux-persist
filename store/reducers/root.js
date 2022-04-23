import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSimpleReducer from "../../utils/createSimpleReducer";
import counterReducer from "./counterReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authUser", "selfUser", "counter"],
};

export const combinedReducer = combineReducers({
  totalPages: createSimpleReducer("totalpage"),
  counter: counterReducer,
  users: createSimpleReducer("user"),
});

/**
 * create new reducer with existing reducer
 */
export const persistedReducer = persistReducer(persistConfig, combinedReducer);
