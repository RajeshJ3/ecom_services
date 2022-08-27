import { configureStore } from "@reduxjs/toolkit";
import utils from "./utils/utilsSlice";

export default configureStore({
  reducer: {
    utils,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
