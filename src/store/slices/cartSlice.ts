import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/product';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const loadCartFromStorage = (): CartItem[] => {
  return [];
};

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { totalItems, totalPrice };
};

const loadedItems = loadCartFromStorage();
const { totalItems, totalPrice } = calculateTotals(loadedItems);

const initialState: CartState = {
  items: loadedItems,
  totalItems,
  totalPrice,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;

      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity,
        });
      }

      const { totalItems, totalPrice } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;

      state.items = state.items.filter(item => item.id !== productId);

      const { totalItems, totalPrice } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;

      const item = state.items.find(item => item.id === id);

      if (item) {
        item.quantity = Math.max(1, quantity);
      }

      const { totalItems, totalPrice } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },

    clearCart: state => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
