
export const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const API_URL = BASE_URL + "/api";
export const GROUP_CHAT_URL = API_URL + "/create-chat-group";
export const GET_GROUP_CHAT_URL = API_URL + "/chat-groups";
export const DELETE_GROUP_CHAT_URL =(id:string) =>{return  API_URL + `/delete-group/${id}`;}
