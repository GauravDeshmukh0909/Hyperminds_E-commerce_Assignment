import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/cart`;

// GET CART
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("FETCHED CART:", res.data);

  return res.data;
});

// ADD TO CART
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      API_URL,
      { productId, quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("ADD TO CART:", res.data);
    return res.data;
  }
);

// UPDATE ITEM
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, quantity }) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `${API_URL}/${id}`,
      { quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  }
);


// REMOVE ITEM
export const removeFromCart = createAsyncThunk(
  "cart/removeItem",
  async (productId) => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${API_URL}/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.items || []; // FIXED
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload?.items || []; // FIXED
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload?.items || [];
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload?.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
