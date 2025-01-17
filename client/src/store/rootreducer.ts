import { combineReducers } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../components/auth/authSlices";
import createChatGroupReducer, {
  CreateChatGroupState,
} from "../components/groupChat/slices/groupChatSlice";
import getChatGroupReducer, {
  ChatGroups,
} from "../components/groupChat/slices/getChatGroupSlice";
import updateChatGroupReducer, {
  UpdateChatGroupState,
} from "../components/groupChat/slices/updateChatGroupSlice";
import getChatGroupByIdReducer, {
  ChatGroupState,
} from "../components/chats/slices/ChatGroupByIdSlice";
import getAllChatGroup_reducer, {
  ChatGroupUserState,
} from "../components/chats/slices/ChatGroupUserSlice";
import getAddNewUsertoGroupReducer, {
  NewUserState,
} from "../components/chats/slices/AddNewUserToGroupSlice";

import getChatsReducer, {
  getGroupChatState,
} from "../components/chats/slices/getGroupChatsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  createChatGroupApi: createChatGroupReducer,
  getChatGroup: getChatGroupReducer,
  updateGroup: updateChatGroupReducer,
  getGroupByID: getChatGroupByIdReducer,
  getAllGroupUsers: getAllChatGroup_reducer,
  addNewUserToGroup: getAddNewUsertoGroupReducer,
  getGroupChat: getChatsReducer,
});

export default rootReducer;

// Define RootState for strong typing in selectors
export interface RootState {
  auth: AuthState;
  createChatGroup: CreateChatGroupState;
  getChatGroup: ChatGroups;
  updateGroupState: UpdateChatGroupState;
  getGroupByIdState: ChatGroupState;
  getAllGroupUsersState: ChatGroupUserState;
  addNewUserToState: NewUserState;
  getGroupChatState: getGroupChatState;
}
