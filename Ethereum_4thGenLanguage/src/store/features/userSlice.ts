import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/dataTypes";

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    id: undefined,
    username: "",
    email: "",
    ethAddress: "",
    role: "",
    password: "",
    identityPhotosHash: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = initialState.user;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
