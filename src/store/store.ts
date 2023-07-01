import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import trlReducer from './trlSlice';
import configReducer from './configurationSlice'; 


export const store = configureStore({
  reducer: {
    product: productReducer,
    trl: trlReducer,
    config: configReducer, 

  },
});

export type RootState = ReturnType<typeof store.getState>;
