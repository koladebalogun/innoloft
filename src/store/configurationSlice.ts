import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Config {
  id: number;
  logo: string;
  mainColor: string;
  hasUserSection: boolean;
}

const initialState: Config = {
  id: 0,
  logo: '',
  mainColor: '',
  hasUserSection: true,
};

export const fetchAppConfiguration = createAsyncThunk(
  'config/fetchAppConfiguration',
  async (appId: number) => {
    const response = await fetch(`https://api-test.innoloft.com/configuration/${appId}/`);
    const data: Config = await response.json();
    return data;
  }
);

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAppConfiguration.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export default configSlice.reducer;
