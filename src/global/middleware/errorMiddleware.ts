import { Middleware } from "@reduxjs/toolkit";
import { showErrorMessage } from "../snackbar/reducers/snackbar.slice";

const errorMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.error) {
    store.dispatch(showErrorMessage(action.error.message));
  }
  return next(action);
};

export default errorMiddleware;
