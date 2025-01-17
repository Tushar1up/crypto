// apislice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchcryptodata = createAsyncThunk(
  'api/fetchCryptodata',
  async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    data: null,
    isloading: false,
    iserror: false,
  },
  reducers: {
    resetData: (state) => {
      state.data = null;
    } 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchcryptodata.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchcryptodata.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
      })
      .addCase(fetchcryptodata.rejected, (state) => {
        state.isloading = false;
        state.iserror = true;
      });
  }
});

export const { resetData } = apiSlice.actions;
export default apiSlice.reducer;
