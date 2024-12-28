import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string;
  image: string;
  token: string;
  email: string;
}

const initialState: AuthState = {
  user: "",
  image: "",
  email: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        user: string;
        token: string;
        image: string;
        email: string;
      }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.image = action.payload.image;
      state.email = action.payload.email;
    },
    logout(state) {
      localStorage.removeItem("user");
      state.user = "";
      state.email = "";
      state.image = "";
      state.token = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
export type { AuthState };
