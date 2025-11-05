import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";
import { getToken } from "./localStorageService";

export const createDirectChat = async (userId) => {
    const response = await httpClient.post(API.CREATE_CHAT, {
        type: "DIRECT",
        userIds: [userId]
    });

    return response.data.result;
};

export const getMyChat = async()=>{
    try {
        const response = await httpClient.get(API.GET_MYCHAT)
        return response.data;

    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export const createGroupChat = async (userIds) => {
    const response = await httpClient.post(API.CREATE_CHAT, {
        type: "GROUP", 
        userIds: userIds
    });
    return response.data;
};

export const fetchMessages = async (conversationId) => {
  try {
    const response = await httpClient.get(`${API.GET_MY_MESSAGES}/${conversationId}`);
    return response.data.result;
  } catch (error) {
    console.error("Lỗi khi fetch messages:", error);
    throw error;
  }
};

export const createMessages = async (conversationId, message) => {
  try {
    const response = await httpClient.post(API.CREATE_MESSAGE, {
      conversationId,
      message
    });
    return response.data.result;
  } catch (error) {
    console.error("Lỗi khi gửi message:", error);
    throw error;
  }
};