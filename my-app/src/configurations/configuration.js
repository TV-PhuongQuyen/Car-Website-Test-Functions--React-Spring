
const CONFIG= {
  API_GATEWAY: 'http://localhost:8888/api/v1',  
};

const API = {
  LOGIN: "/identity/auth/token",
  REGISTRATION: "/identity/users/registration",
  MY_PROFILE: "/profile/internal/myProfile",
  PROFILE_UPDATE: "/profile/internal/updateProfile", 
  UPDATE_AVATAR: "/profile/internal/avatar",
  GET_POST: "/post/post/getAllpost",
  GETAll_PROFILE: "/profile/user_profile/allProfile",
  SEARCH_PROFILE: "/profile/user_profile/users/search",
  CREATE_CHAT:"/chat/conversations/create",
  GET_MYCHAT: "/chat/conversations/userId",
  GET_MY_MESSAGES : "/chat/messages",
  CREATE_MESSAGE: "/chat/messages/create"
}

const OAuthCogfig = {
  clientID: "",
  redirect: "",
  authUri: ""
};

export { CONFIG, API, OAuthCogfig };