
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  Fetch products from backend
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to load products");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    search: "",
    category: "all",
    page: 1,
    itemsPerPage: 8,
    loading: false,
    error: null,
  },

  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1; // reset page after search
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1; // reset page after category change
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // backend products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearch, setCategory, setPage } = productSlice.actions;
export default productSlice.reducer;
