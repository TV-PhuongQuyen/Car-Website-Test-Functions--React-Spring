import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";

export const getPost= async (page =1) =>{
    try{
        const response = await httpClient.get(API.GET_POST ,{
            params:{
                page: page,
                size: 10,
            },

        });
        return response.data.result.data;
    }catch(error){
        console.error('Error fetching profile:', error);
        throw error;
    }
};
getPost();