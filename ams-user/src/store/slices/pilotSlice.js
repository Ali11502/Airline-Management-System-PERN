import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pilotInfo: localStorage.getItem('pilotInfo')
    ? JSON.parse(localStorage.getItem('pilotInfo'))
    : null,
};

const pilotSlice = createSlice({
  name: 'pilot',
  initialState,
  reducers: {
    setpilotInfo: (state, action) => {
      state.pilotInfo = action.payload;
      localStorage.setItem('pilotInfo', JSON.stringify(action.payload));
      
    },
  },
});

export const { setpilotInfo } = pilotSlice.actions;

export default pilotSlice.reducer;