import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/product';

interface WishlistState {
  items: Product[];
}

const loadWishlistFromStorage = (): Product[] => {
  return [];
};

const initialState: WishlistState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const exists = state.items.some(item => item.id === product.id);

      if (!exists) {
        state.items.push(product);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearWishlist: state => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
