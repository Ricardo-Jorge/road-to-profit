import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportFinanciadoService from "../services/reportFinanciadoService";

const initialState = {
  reports: {},
  loading: false,
  error: null,
  success: false,
  message: null,
};

//Thunk create Report Financiado
export const createReportFinanciado = createAsyncThunk(
  "reportFinanciado/create",
  async (formId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await reportFinanciadoService.createReportFinanciado(
        formId,
        token
      );
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk Get Report
export const getReportFinanciado = createAsyncThunk(
  "reportFinanciado/getOne",
  async (formId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await reportFinanciadoService.getReportFinanciado(
        formId,
        token
      );
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk Get Report
export const deleteReportFinanciado = createAsyncThunk(
  "reportFinanciado/delete",
  async (formId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await reportFinanciadoService.deleteReportFinanciado(formId, token);
      return formId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Slice
const reportFinanciadoSlice = createSlice({
  name: "reportFinanciado",
  initialState,
  reducers: {
    resetReportFinanciadoMessage: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReportFinanciado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReportFinanciado.fulfilled, (state, action) => {
        state.loading = false;
        const newReport = action.payload;
        state.reports[newReport.FormFinanciadoId] = newReport;
      })
      .addCase(createReportFinanciado.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.errors) {
          state.error = action.payload.errors;
        } else {
          state.error = ["Ocorreu um erro desconhecido."];
        }
      })
      .addCase(getReportFinanciado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReportFinanciado.fulfilled, (state, action) => {
        state.loading = false;
        const fetchedReport = action.payload;
        if (fetchedReport && fetchedReport.FormFinanciadoId) {
          state.reports[fetchedReport.FormFinanciadoId] = fetchedReport;
        }
      })
      .addCase(getReportFinanciado.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.errors) {
          state.error = action.payload.errors;
        } else {
          state.error = ["Ocorreu um erro desconhecido."];
        }
      })
      .addCase(deleteReportFinanciado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReportFinanciado.fulfilled, (state, action) => {
        const formId = action.payload;
        delete state.reports[formId];
      });
  },
});

export const { resetReportFinanciadoMessage } = reportFinanciadoSlice.actions;
export default reportFinanciadoSlice.reducer;
