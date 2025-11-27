import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { itemsService } from '../../services/itemsService';

const initialState = {
  list: [],
  selectedItem: null,
  loadingList: false,
  loadingItem: false,
  errorList: null,
  errorItem: null,
  query: '',
};

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (query, { rejectWithValue }) => {
    try {
      const res = await itemsService.getAll(query);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch items');
    }
  }
);

export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await itemsService.getById(id);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch item');
    }
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    clearSelected(state) {
      state.selectedItem = null;
      state.errorItem = null;
      state.loadingItem = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload || [];
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload || action.error.message;
      })
      .addCase(fetchItemById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
        state.selectedItem = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload || null;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.payload || action.error.message;
      });
  },
});

export const { setQuery, clearSelected } = itemsSlice.actions;
export default itemsSlice.reducer;
