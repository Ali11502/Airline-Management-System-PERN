import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  passengerInfo: localStorage.getItem('passengerInfo')
    ? JSON.parse(localStorage.getItem('passengerInfo'))
    : null,
};

const passengerSlice = createSlice({
  name: 'passenger',
  initialState,
  reducers: {
    setpassengerInfo: (state, action) => {
      state.passengerInfo = action.payload;
      localStorage.setItem('passengerInfo', JSON.stringify(action.payload));
      
    },
  },
});

export const { setpassengerInfo } = passengerSlice.actions;

export default passengerSlice.reducer;