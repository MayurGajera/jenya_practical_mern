import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalPrice: 0,
  totalItems: 0,
};

const calculateTotals = (items) => {
  let totalItems = 0;
  let totalPrice = 0;
  items.forEach((item) => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;
  });
  return { totalItems, totalPrice };
};

const computed = calculateTotals(initialState.items);
initialState.totalItems = computed.totalItems;
initialState.totalPrice = computed.totalPrice;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      const { totalItems, totalPrice } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);

      const { totalItems, totalPrice } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }

      const { totalItems, totalPrice } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
