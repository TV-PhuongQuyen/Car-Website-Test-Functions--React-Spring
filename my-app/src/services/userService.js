import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";


 const registration = async (username, password) => {
    const response = await httpClient.post(API.REGISTRATION, {
        username: username,
        password: password
    }

    );
    return response;
};

export { registration };
