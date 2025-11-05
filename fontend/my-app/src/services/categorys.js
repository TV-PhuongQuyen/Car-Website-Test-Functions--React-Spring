import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";


export const createCategory = async (categoryRequest, logoFile) => {
  const formData = new FormData();

  const jsonBlob = new Blob([JSON.stringify(categoryRequest)], {
    type: "application/json",
  });
  formData.append("categoryRequest", jsonBlob);
  formData.append("file", logoFile);

  const response = await httpClient.post(API.CREATE_CATEGORY, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.result;
};
export const getAllCategories = async () => {
    const response = await httpClient.get(API.GET_CATEGORY);
    return response.data.result; 
};

export const deleteCategory = async (categoryId) => {
    
    const response = await httpClient.delete(`${API.GET_CATEGORY}/${categoryId}`);
    
    return response.data.message; 
};