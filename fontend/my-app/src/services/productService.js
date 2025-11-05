import httpClient  from "../configurations/httpClient";
import { API } from "../configurations/configuration";

export const getProduct = async (page = 1) => {
    try{
        const response = await httpClient.get(API.GET_PRODUCT, {
            params: {
                page: page,
                size: 100,
            },
        });
  
        return response.data.result;
    }catch(error){
        console.error('Error fetching product:', error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
  
    const response = await httpClient.delete(`${API.DELETE_PRODUCT}/${productId}`);
    
    return response.data.message; 
};

export const searchAutoComplete = async (text) => {
  try {
    const response = await httpClient.get(API.SEARCH_PRODUCT_AUTOCOMPLETE, {
      params: { prefix: text }, 
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error);
  }
};


export const searchText = async (text, limit = 50) => {
  try {
    const response = await httpClient.get(API.SEARCH_PRODUCT_TEXT, {
      params: { keyword: text, limit },
    });
    console.log("Dữ liệu searchText:", response.data.result);
    return response.data.result; // vì backend trả list<Long>
  } catch (error) {
    console.error("Error fetching text search:", error);
    throw error;
  }
};

// Hàm gửi dữ liệu sản phẩm + danh sách ảnh
export const createProduct = async (productRequest, files) => {
  try {
    const formData = new FormData();

    const productBlob = new Blob([JSON.stringify(productRequest)], {
      type: "application/json",
    });
    formData.append("productRequest", productBlob);

    // Thêm các file vào FormData
    files.forEach((file) => {
      formData.append("file", file); // key "file" phải khớp @RequestPart("file")
    });

    // Gửi request
    const response = await httpClient.post(API.CREATE_PRODUCT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
        timeout: 120000,
    });
    console.log("Du lieu",response.data.result)
    return response.data.result;
  } catch (error) {
    console.error(" Upload product error:", error);
    throw error;
  }
};



export const searchProduct = async (file, k = 5) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("k", k);

        const response = await httpClient.post(API.SEARCH_PRODUCT, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Response from searchProduct:", response.data.result);
        return response.data.result; 
    } catch (error) {
        console.error("Error searching product:", error);
        throw error;
    }
};
export const getTotalProducts = async () => {
  try {
    const response = await httpClient.get(`${API.COUNT_PRODUCT}/count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching total posts:", error);
    throw error;
  }
};