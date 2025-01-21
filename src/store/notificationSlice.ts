import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface NotificationState {
  notifications: any[]; // Array to hold multiple notifications
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload); // Add a new notification
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification: any) => notification.id !== action.payload
      ); // Remove a notification by ID
    },
    clearNotifications: (state) => {
      state.notifications = []; // Clear all notifications
    },
  },
});

export const { addNotification, removeNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
