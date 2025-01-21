import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  selectedChat: any | null;
}

const initialState: ChatState = {
  selectedChat: null,
};

const currentChatSlice = createSlice({
  name: 'currentChat',
  initialState,
  reducers: {
    setSelectedChat: (state, action: PayloadAction<any>) => {
      state.selectedChat = action.payload;
    },
  },
});

export const { setSelectedChat } = currentChatSlice.actions;
export default currentChatSlice.reducer;
