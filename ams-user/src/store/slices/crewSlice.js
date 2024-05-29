import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  crewInfo: localStorage.getItem('crewInfo')
    ? JSON.parse(localStorage.getItem('crewInfo'))
    : null,
};

const crewSlice = createSlice({
  name: 'crew',
  initialState,
  reducers: {
    setcrewInfo: (state, action) => {
      state.crewInfo = action.payload;
      localStorage.setItem('crewInfo', JSON.stringify(action.payload));
      
    },
  },
});

export const { setcrewInfo } = crewSlice.actions;

export default crewSlice.reducer;