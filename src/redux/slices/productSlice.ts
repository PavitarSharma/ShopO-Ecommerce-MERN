import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { Product } from "@/utils/types";

interface ProductState {
  product: Product | null;
  wishlists: Product[];
}

const initialState: ProductState = {
  product: null,
  wishlists: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },

    resetProduct: () => initialState,

    addToWishList: (state, action: PayloadAction<Product>) => {
      if (!state.wishlists || !Array.isArray(state.wishlists)) {
        state.wishlists = [];
      }

      state.wishlists.push(action.payload);
    },

    removeFromWishList: (state, action: PayloadAction<Product>) => {
      const productIdToRemove = action.payload._id;
      state.wishlists = state.wishlists.filter(
        (product) => product._id !== productIdToRemove
      );
    },
  },
});

export const SelectProductState = (state: RootState) => state.product;

export const { getProduct, resetProduct, removeFromWishList, addToWishList } =
  productSlice.actions;

export default productSlice.reducer;
