import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {myProfile, updateProfile, uploadAvatar} from "../services/profileService";

export const fetchMyProfile = createAsyncThunk(
  "profile/fetch",
  async () => {
    const response = await myProfile();
    return response.result;
  }
);

// Update profile
export const fetchUpdateProfile = createAsyncThunk(
  "profile/update",
  async (data) => {
    const response = await updateProfile(data);
    return response.result; // lấy result sau khi update thành công
  }
);

export const fetchUpdateAvatar = createAsyncThunk(
    "profile/updateAvatar",
    async (formData) => {
        const response = await uploadAvatar(formData);
        return response.result; 
    }
); 


const profileSlice = createSlice({ 
    name: "profile",
    initialState: {
        result: null,
        loading: false,
        error: null
    },
    reducers: {
        clearProfile(state) {
            state.result = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchMyProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyProfile.fulfilled, (state, action) => {
        
                state.loading = false;
                state.result = action.payload;
                       
            })

            .addCase(fetchMyProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
                  
            .addCase(fetchUpdateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUpdateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(fetchUpdateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchUpdateAvatar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUpdateAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.result = {
                    ...state.result,
                    ...action.payload // merge luôn object result từ API
                };
            })
            .addCase(fetchUpdateAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
            
    }
});
export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;