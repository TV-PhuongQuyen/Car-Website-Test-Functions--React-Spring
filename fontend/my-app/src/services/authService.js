import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";
import { setToken, getToken, removeToken } from "./localStorageService";

const login = async (username, password) => {

    
    const url = httpClient.defaults.baseURL + API.LOGIN;

    
    try {
        const response = await httpClient.post(API.LOGIN, {
            username: username,
            password: password
        });
        
        
        if (response.data?.result?.token) {
            setToken(response.data.result.token);
        }
        
        return response;
    } catch (error) {
        console.log(' Login request failed:', error);
        throw error;
    }
};

const logout = () => {

    removeToken();
}

const isAuthenticated = () => {
    const token = getToken();
    const result = !!token;

    return result;
}

const getTokened = () => {
    const token = getToken();

    return token;
}
export const getTotalUsers = async () => {
  try {
    const response = await httpClient.get(`${API.GET_USER}/count`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching total posts:", error);
    throw error;
  }
};
export { login, logout, isAuthenticated, getTokened };