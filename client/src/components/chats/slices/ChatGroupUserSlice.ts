import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatGroupUserData {
  group_id: string;
  name: string;
  chat_group: string;
  createdAt: string;
}
[];

interface ChatGroupUserState {
  data: Array<ChatGroupUserData>;
  loading: boolean;
  error: string | null;
}

// initial state
const initialState: ChatGroupUserState = {
  data: [],
  loading: false,
  error: null,
};

const getAllChatGroupUserSlice = createSlice({
  name: "getGroupById",
  initialState,
  reducers: {
    getAllChatGroupUser_Start: (state) => {
      (state.loading = true), (state.error = null);
    },
    getAllChatGroupUser_Success: (
      state,
      action: PayloadAction<Array<ChatGroupUserData>>
    ) => {
      (state.loading = false), (state.data = action.payload);
    },
    getAllChatGroupUsers_Failure: (state, action: PayloadAction<string>) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const {
  getAllChatGroupUser_Start,
  getAllChatGroupUser_Success,
  getAllChatGroupUsers_Failure,
} = getAllChatGroupUserSlice.actions;
export default getAllChatGroupUserSlice.reducer;
export type { ChatGroupUserState };
