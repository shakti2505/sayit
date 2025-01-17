import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface getGroupChats {
  _id: string;
  sender_id: string;
  createdAt: Date;
  group_id: string;
  message: string;
  name: string;
  isRead:boolean,
  isReceived:boolean,
}
[];

interface getGroupChatState {
  data: Array<getGroupChats>;
  loading: boolean;
  error: string | null;
}

// initita state
const initialState: getGroupChatState = {
  data: [],
  loading: false,
  error: null,
};

// slices
const groupChatsSlice = createSlice({
  name: "groupChats",
  initialState,
  reducers: {
    getGroupChatStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    getGroupChatsuccess: (
      state,
      action: PayloadAction<Array<getGroupChats>>
    ) => {
      (state.loading = false), (state.data = action.payload);
    },
    getGroupChatfailure: (state, action: PayloadAction<string>) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const { getGroupChatStart, getGroupChatsuccess, getGroupChatfailure } =
  groupChatsSlice.actions;
export default groupChatsSlice.reducer;
export type { getGroupChatState };
