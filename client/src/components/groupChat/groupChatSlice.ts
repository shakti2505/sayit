import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// state types for creating chat group service
interface CreateChatGroupState {
  data: string;
  loading: boolean;
  error: string | null;
}

// initial state
const initialState: CreateChatGroupState = {
  data: "",
  loading: false,
  error: null,
};

const createChatGroupSlice = createSlice({
  name: "createChatGroup",
  initialState,
  reducers: {
    createGroupChatStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createGroupChatSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = action.payload;
    },
    createGroupChatFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});




export const {createGroupChatFailure, createGroupChatStart,createGroupChatSuccess} = createChatGroupSlice.actions;
export default createChatGroupSlice.reducer;
export type {CreateChatGroupState};