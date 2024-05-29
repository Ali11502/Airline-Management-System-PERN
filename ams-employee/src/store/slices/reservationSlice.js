import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reservationInfo: localStorage.getItem('reservationInfo')
    ? JSON.parse(localStorage.getItem('reservationInfo'))
    : null,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setreservationInfo: (state, action) => {
      state.reservationInfo = action.payload;
      localStorage.setItem('reservationInfo', JSON.stringify(action.payload));
      
    },
  },
});

export const { setreservationInfo } = reservationSlice.actions;

export default reservationSlice.reducer;