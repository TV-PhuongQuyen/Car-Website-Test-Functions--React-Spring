
const CONFIG= {
  API_GATEWAY: 'http://localhost:8888/api/v1',  
};

const API = {
  LOGIN: "/identity/auth/token",
  GET_USER: "/identity/users",
  REGISTRATION: "/identity/users/registration",
  MY_PROFILE: "/profile/internal/myProfile",
  PROFILE_UPDATE: "/profile/internal/updateProfile", 
  UPDATE_AVATAR: "/profile/internal/avatar",
  GET_POST: "/post/post",
  CREATE_POST:"/post/post/create",
  DELETE_POST:"/post/post",
  GETAll_PROFILE: "/profile/user_profile/allProfile",
  SEARCH_PROFILE: "/profile/user_profile/users/search",
  CREATE_CHAT:"/chat/conversations/create",
  GET_MYCHAT: "/chat/conversations/userId",
  GET_MY_MESSAGES : "/chat/messages",
  CREATE_MESSAGE: "/chat/messages/create",
  COUNT_PRODUCT: "/product/productInternal",
  GET_PRODUCT: "/product/productPublic/getAllProduct",
  DELETE_PRODUCT: "/product/productInternal",
  SEARCH_PRODUCT: "/product/productPublic/search",
  SEARCH_PRODUCT_TEXT: "/product/productPublic/searchText",
  CREATE_PRODUCT:"/product/productInternal/create",
  SEARCH_PRODUCT_AUTOCOMPLETE: "/product/productPublic/autocomplete",
  SEARCH_PRODUCT_TEXT_OLD: "/history/searchHistory/getHistory",
  CREATE_SEARCH_HISTORY: "/history/searchHistory/create",
  DELETE_SEARCH_HISTORY: "/history/searchHistory",
  GET_SEARCH_STATISTICS: "/history/searchHistory/statistics/hourly",
  GET_TOP_USERS_BY_MONTH: "/history/searchHistory/top-users",
  CREATE_CATEGORY: "/category/categoryInternal/create",
  GET_CATEGORY:"/category/categoryInternal",

}

const OAuthCogfig = {
  clientID: "",
  redirect: "http://localhost:3000/authenticate",
  authUri: ""
};

export { CONFIG, API, OAuthCogfig };