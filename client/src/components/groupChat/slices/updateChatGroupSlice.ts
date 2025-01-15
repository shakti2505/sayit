import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UpdateChatGroupState {
  data: string;
  loading: boolean;
  error: string | null;
}

// initial state
const initialState: UpdateChatGroupState = {
  data: "",
  loading: false,
  error: null,
};

const UpdateChatGroupSlice = createSlice({
  name: "updateChatGroup",
  initialState,
  reducers: {
    updateGroupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateGroupSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = action.payload;
    },
    updateGroupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { updateGroupStart, updateGroupSuccess, updateGroupFailure } =
  UpdateChatGroupSlice.actions;
export default UpdateChatGroupSlice.reducer;
export type { UpdateChatGroupState };
