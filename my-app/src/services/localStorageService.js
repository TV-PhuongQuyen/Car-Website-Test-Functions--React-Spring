export const KEY_TOKEN = "accessToken";

const setToken = (token) => {
    localStorage.setItem(KEY_TOKEN, token);
};
const getToken = () => {
    return localStorage.getItem(KEY_TOKEN);
}
const removeToken = () => {
    localStorage.removeItem(KEY_TOKEN);
}
export { setToken, getToken, removeToken };