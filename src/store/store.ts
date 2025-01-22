import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import chatReducer from './chatSlice'
import currentChatReducer from './currentChatSlice';
import notificationReducer from './notificationSlice';
import booleanReducer from './newSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
        chat: chatReducer,
        currentChat: currentChatReducer,
        notifications: notificationReducer,
        booleanState: booleanReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
