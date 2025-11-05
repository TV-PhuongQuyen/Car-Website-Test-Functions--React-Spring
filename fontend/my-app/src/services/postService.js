import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";

export const getPost = async (page = 1) => {
  try {
    const response = await httpClient.get(API.GET_POST, {
      params: { page, size: 10 },
    });

    // trả đúng structure backend trả về
    return response.data.result;

  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const createPost = async (context, privacy, file) => {
    try {
        const formData = new FormData();
        formData.append("context", context);
        formData.append("privacy", privacy);
        formData.append("file", file);

        const response = await httpClient.post(API.CREATE_POST, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data.result;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};
export const deletePost = async (postId) => {
    try {
        const response = await httpClient.delete(`${API.DELETE_POST}/${postId}`);
        return response.data.message;  
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};
export const getTotalPosts = async () => {
  try {
    const response = await httpClient.get(`${API.GET_POST}/count`);
    return response.data.result; // vì backend trả .result
  } catch (error) {
    console.error("Error fetching total posts:", error);
    throw error;
  }
};