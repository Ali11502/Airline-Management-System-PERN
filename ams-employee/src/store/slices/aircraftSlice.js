import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  aircraftInfo: localStorage.getItem('aircraftInfo')
    ? JSON.parse(localStorage.getItem('aircraftInfo'))
    : null,
};

const aircraftSlice = createSlice({
  name: 'aircraft',
  initialState,
  reducers: {
    setaircraftInfo: (state, action) => {
      state.aircraftInfo = action.payload;
      localStorage.setItem('aircraftInfo', JSON.stringify(action.payload));
      
    },
  },
});

export const { setaircraftInfo } = aircraftSlice.actions;

export default aircraftSlice.reducer;