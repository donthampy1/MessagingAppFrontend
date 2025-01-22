import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BooleanState {
  value: boolean;
}

const initialState: BooleanState = {
  value: false,
};

const booleanSlice = createSlice({
  name: 'booleanState',
  initialState,
  reducers: {
    setBoolean: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    toggleBoolean: (state) => {
      state.value = !state.value;
    },
  },
});

export const { setBoolean, toggleBoolean } = booleanSlice.actions;
export default booleanSlice.reducer;
