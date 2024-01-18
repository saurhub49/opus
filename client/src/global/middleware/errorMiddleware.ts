import { Middleware } from "@reduxjs/toolkit";
import { showErrorMessage } from "../snackbar/reducers/snackbar.slice";

const errorMiddleware: Middleware = (store) => (next) => (action) => {
  if ((action as any).error) {
    store.dispatch(showErrorMessage((action as any).error.message));
  }
  return next(action);
};

export default errorMiddleware;
