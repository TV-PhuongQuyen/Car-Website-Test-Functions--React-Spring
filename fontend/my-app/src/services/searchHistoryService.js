import httpClient  from "../configurations/httpClient";
import { API } from "../configurations/configuration";

export const getSearchHistory = async () =>{
    try{
        const response = await httpClient.get(API.SEARCH_PRODUCT_TEXT_OLD);
     
        return response.data.result;
    }catch(error){
        console.error('Error fetching search history:', error);
        throw error;
    }
}

export const createSearchHistory = async (queryText) => {
    try {
        const response = await httpClient.post(API.CREATE_SEARCH_HISTORY, {
            queryText: queryText
        });
        return response.data.message;
    } catch (error) {
        console.error('Error creating search history:', error);
        throw error;
    }
}

export const deleteSearchHistory = async (historyId) => {
    try {
        const response = await httpClient.delete(`${API.DELETE_SEARCH_HISTORY}/${historyId}`);
        return response.data.message;
    } catch (error) {
        console.error('Error deleting search history:', error);
        throw error;
    }
}

export const getSearchStatistics = async (year, month) => {
  try {
    const response = await httpClient.get(API.GET_SEARCH_STATISTICS, {
      params: { year, month },
    });
    
    console.log("Dữ liệu thống kê:", response.data);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching search statistics:", error);
    throw error;
  }
};

export const getTopUsersByMonth = async (year) => {
    try {
        const response = await httpClient.get(API.GET_TOP_USERS_BY_MONTH, {
            params: { year },
        });
        console.log("Top users:", response.data);
        return response.data.result;
    } catch (error) {
        console.error("Error fetching top users:", error);
        throw error;
    }
}