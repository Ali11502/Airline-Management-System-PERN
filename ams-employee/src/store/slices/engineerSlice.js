import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  engineerInfo: localStorage.getItem('engineerInfo')
    ? JSON.parse(localStorage.getItem('engineerInfo'))
    : null,
};

const engineerSlice = createSlice({
  name: 'engineer',
  initialState,
  reducers: {
    setengineerInfo: (state, action) => {
      state.engineerInfo = action.payload;
      localStorage.setItem('engineerInfo', JSON.stringify(action.payload));
      
    },
  },
});

export const { setengineerInfo } = engineerSlice.actions;

export default engineerSlice.reducer;