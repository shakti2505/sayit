import { combineReducers } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../components/auth/authSlices";
import createChatGroupReducer, {
  CreateChatGroupState,
} from "../components/groupChat/groupChatSlice";
import getChatGroupReducer, {
  ChatGroups,
} from "../components/groupChat/getChatGroupSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  createChatGroupApi: createChatGroupReducer,
  getChatGroup: getChatGroupReducer,
});

export default rootReducer;

// Define RootState for strong typing in selectors
export interface RootState {
  auth: AuthState;
  createChatGroup: CreateChatGroupState;
  getChatGroup: ChatGroups;
}
