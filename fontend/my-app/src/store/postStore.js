import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPost } from "../services/postService";

// Async thunk fetch post
export const fetchPost = createAsyncThunk(
  "post/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPost();
      console.log("Dữ liệu API:", response);

      // Trả về luôn response (vì nó là mảng)
      return response.data;
    } catch (error) {
      console.error("Lỗi khi fetch post:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const postSlice = createSlice({
  name: "post",
  initialState: {
    result: [],      // luôn là mảng
    loading: false,
    error: null
  },
  reducers: {
    clearPost(state) {
      state.result = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
        console.log("Redux state cập nhật result:", state.result);
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  }
});

export const { clearPost } = postSlice.actions;
export default postSlice.reducer;
