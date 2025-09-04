import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";
import { getToken } from "./localStorageService";

// API lấy profile
export const myProfile = async () => {
  const token = getToken();
  if(!token){
    return null;
  }
  try {
    const response = await httpClient.get(API.MY_PROFILE);
    return response.data; // Trả về data từ API
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const searchProfile = async (keyword) => {
  try {
    const response = await httpClient.post(API.SEARCH_PROFILE, {
      keyword: keyword,  
    });
    console.log(response.data.result);
    return response.data.result;
  } catch (error) {
    console.error("Error searching profile:", error);
    throw error;
  }
};


export const updateProfile = async (profileData) => {
  try {
    const response = await httpClient.put(API.PROFILE_UPDATE, profileData);
    return response.data; // Trả về data từ API
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const uploadAvatar = async (formData) => {
  try {
    const response = await httpClient.put(API.UPDATE_AVATAR, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Return the data, not the full response
  } catch (error) {
    console.error('Upload avatar error:', error);
    throw error;
  }
};


