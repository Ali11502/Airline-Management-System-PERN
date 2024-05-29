import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectionInfo: localStorage.getItem('selectionInfo')
    ? JSON.parse(localStorage.getItem('selectionInfo'))
    : null,
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    setSelectionInfo: (state, action) => {
      state.selectionInfo = action.payload;
      localStorage.setItem('selectionInfo', JSON.stringify(action.payload));
      
    },
  },
});

export const { setSelectionInfo } = selectionSlice.actions;

export default selectionSlice.reducer;