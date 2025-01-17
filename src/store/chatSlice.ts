import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: string[]; 
  createdAt: string;
  updatedAt: string;
}

const initialState: ChatState = {
  _id: '',
  chatName: '',
  isGroupChat: false,
  users: [],
  createdAt: '',
  updatedAt: '',
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<ChatState>) => {
      return action.payload
    },
    clearChat: (state) => {
      return initialState
    },
  },
});

export const { setChat, clearChat } = chatSlice.actions;

export default chatSlice.reducer;
