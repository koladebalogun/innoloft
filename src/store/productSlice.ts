import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ProductState {
  data: any;
  status: 'notLoading' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

const initialState: ProductState = {
  data: null,
  status: 'notLoading',
  error: null,
};

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async () => {
    const response = await fetch('https://api-test.innoloft.com/product/6781/');
    const data = await response.json();
    return data;
  },
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (productData: any) => {
    const response = await fetch(
      'https://api-test.innoloft.com/product/6781/',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      },
    );

    const data = await response.json();
    return data;
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
