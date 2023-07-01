import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface TrlState {
  data: any[];
  status: 'notLoading' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

const initialState: TrlState = {
  data: [],
  status: 'notLoading',
  error: null,
};

export const fetchTrlList = createAsyncThunk('trl/fetchTrlList', async () => {
  const response = await fetch('https://api-test.innoloft.com/trl/');
  const data = await response.json();
  return data;
});

const trlSlice = createSlice({
  name: 'trl',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrlList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTrlList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchTrlList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default trlSlice.reducer;
