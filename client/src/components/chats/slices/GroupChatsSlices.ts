import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface groupChats {
  group_id: string;
  message: string;
  name: string;
}
[];

interface groupChatState {
  data: Array<groupChats>;
  loading: boolean;
  error: string | null;
}

// initita state
const initialState: groupChatState = {
  data: [],
  loading: false,
  error: null,
};

// slices
const groupChatsSlice = createSlice({
  name: "groupChats",
  initialState,
  reducers: {
    groupChatStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    groupChatsuccess: (state, action: PayloadAction<Array<groupChats>>) => {
      (state.loading = false), (state.data = action.payload);
    },
    groupChatfailure: (state, action: PayloadAction<string>) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const { groupChatStart, groupChatfailure, groupChatsuccess } =
  groupChatsSlice.actions;
export default groupChatsSlice.reducer;
export type { groupChatState };
