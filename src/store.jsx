import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "../src/slices/userSlice";
import formAlugadoReducer from "../src/slices/formAlugadoSlice";
import formFinanciadoReducer from "../src/slices/formFinanciadoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    formAlugado: formAlugadoReducer,
    formFinanciado: formFinanciadoReducer,
  },
});
