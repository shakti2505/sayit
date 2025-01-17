import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface groupData {
  _id: string;
  group_id: string;
  name: string;
  user_id: string;
  passcode: string;
  created_At: string;
}

interface ChatGroupState {
  data: groupData | null;
  loading: boolean;
  error: string | null;
}

// initial State

// initial state
const initialState: ChatGroupState = {
  data: null,
  loading: false,
  error: null,
};

const getGroupByIdSlice = createSlice({
  name: "getGroupById",
  initialState,
  reducers: {
    getGroupByIdStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    getGroupByIdSuccess: (state, action: PayloadAction<groupData>) => {
      (state.loading = false), (state.data = action.payload);
    },
    getGroupByIdFailure: (state, action: PayloadAction<string>) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const { getGroupByIdStart, getGroupByIdFailure, getGroupByIdSuccess } =
  getGroupByIdSlice.actions;
export default getGroupByIdSlice.reducer;
export type { ChatGroupState };
