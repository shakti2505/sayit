import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface newUserData {
  name: string;
  chatgroup: string;
  group_id: string;
}
[];

interface NewUserState {
  data: Array<newUserData>;
  loading: boolean;
  error: string | null;
}

const initialState: NewUserState = {
  data: [],
  loading: false,
  error: null,
};

const addNewUsertoGroupSlice = createSlice({
  name: "addNewUserToGroup",
  initialState,
  reducers: {
    addNewUserToGroup_start: (state) => {
      (state.loading = true), (state.error = null);
    },
    addNewUserToGroup_success: (
      state,
      action: PayloadAction<Array<newUserData>>
    ) => {
      (state.loading = false), (state.data = action.payload);
    },
    addNewUserToGroup_failure: (state, action: PayloadAction<string>) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const {
  addNewUserToGroup_failure,
  addNewUserToGroup_success,
  addNewUserToGroup_start,
} = addNewUsertoGroupSlice.actions;
export default addNewUsertoGroupSlice.reducer;
export type { NewUserState };
