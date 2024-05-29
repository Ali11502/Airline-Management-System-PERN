import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flightsInfo: localStorage.getItem('flightsInfo')
    ? JSON.parse(localStorage.getItem('flightsInfo'))
    : null,
};

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFlightsInfo: (state, action) => {
      state.flightsInfo = action.payload;
      localStorage.setItem('flightsInfo', JSON.stringify(action.payload));
      
    },
  },
});

export const { setFlightsInfo } = flightsSlice.actions;

export default flightsSlice.reducer;