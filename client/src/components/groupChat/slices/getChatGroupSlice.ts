import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// state type for get chat group
interface ChatGroupItem {
  _id: string; 
  name: string;
  user_id: string; 
  passcode: string;
  createdAt: string; 
  group_id: string;
}

interface ChatGroups {
  data:ChatGroupItem[]; // array of group items
  loading: boolean;
  error: string | null;
}

// initial state
const initialState: ChatGroups = {
  data: [],
  loading: false,
  error: null,
};

const groupSlices = createSlice({
  name: "Chat Groups",
  initialState,
  reducers: {
    getGroupsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getGroupsSuccess: (state, action: PayloadAction<ChatGroupItem[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    getGroupsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { getGroupsStart, getGroupsSuccess, getGroupsFailure } =
  groupSlices.actions;
export default groupSlices.reducer;
export type {ChatGroupItem, ChatGroups};