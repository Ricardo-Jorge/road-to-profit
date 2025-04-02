import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "../src/slices/userSlice";
import formAlugadoReducer from "../src/slices/formAlugadoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    formAlugado: formAlugadoReducer,
  },
});
