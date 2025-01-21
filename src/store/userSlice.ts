import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  _id: string;
  email: string;
  username: string;
  picture:string;
  createdAt: string;
  updatedAt: string;
}

const initialState: UserState = {
  _id: '',
  email: '',
  username: '',
  picture:'',
  createdAt: '',
  updatedAt: '',
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // @ts-ignore
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload
    },
    // @ts-ignore

    clearUser: (state) => {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;