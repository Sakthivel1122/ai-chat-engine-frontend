// store/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  role: "user" | "admin";
}

interface UserState {
  currentUser: User | null;
  userName: string | null;
}

const initialState: UserState = {
  currentUser: null,
  userName: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    setUserName: (state, action) => {
        state.userName = action.payload;
    }
  },
});

export const { setUser, logoutUser, setUserName } = userSlice.actions;
export default userSlice.reducer;
