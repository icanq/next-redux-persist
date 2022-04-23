import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistStore } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import { combinedReducer, persistedReducer } from "./reducers/root";

/**
 * create store
 */
const makeStore = ({ isServer }) => {
  if (isServer) {
    console.log("here");
    /**
     * If it's on server side, create a store
     */
    return configureStore({
      reducer: combinedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
  } else {
    /**
     * If it's on client side, create a store which will persist
     */
    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
    /**
     * This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
     */
    store.__persistor = persistStore(store);

    return store;
  }
};

export const wrapper = createWrapper(makeStore);
