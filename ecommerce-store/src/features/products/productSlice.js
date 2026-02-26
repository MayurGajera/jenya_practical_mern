import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProductsApi,
  fetchProductsByCategoryApi,
  fetchCategoriesApi,
} from "./productAPI";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit = 12, skip = 0 }, { rejectWithValue }) => {
    try {
      const data = await fetchProductsApi({ limit, skip });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const data = await fetchProductsByCategoryApi(category);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCategoriesApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  items: [],
  categories: [],
  total: 0,
  skip: 0,
  limit: 12,
  loading: false,
  error: null,
  selectedCategory: "all",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.skip = 0;
    },
    setPage: (state, action) => {
      state.skip = (action.payload - 1) * state.limit;
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
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.map((cat) =>
          typeof cat === "string" ? cat : cat.slug,
        );
      });
  },
});

export const { setCategory, setPage } = productSlice.actions;
export default productSlice.reducer;
