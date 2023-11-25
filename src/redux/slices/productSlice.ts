import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { Product } from "@/utils/types";

interface ProductState {
  product: Product | null;
}

const initialState: ProductState = {
  product: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },

    resetProduct: (state) => {
      state.product = null;
    },
  },
});

export const SelectProductState = (state: RootState) => state.product;

export const { getProduct, resetProduct } = productSlice.actions;

export default productSlice.reducer;
