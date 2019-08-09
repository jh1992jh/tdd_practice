import { createStore, applyMiddleware } from "redux";
import { middleware } from "../src/store";
import rootReducer from "../src/reducers";

export const storeFactory = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};
