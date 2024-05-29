import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paymentInfo: localStorage.getItem('paymentInfo')
    ? JSON.parse(localStorage.getItem('paymentInfo'))
    : null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setpaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
      localStorage.setItem('paymentInfo', JSON.stringify(action.payload));
      
    },
  },
});

export const { setpaymentInfo } = paymentSlice.actions;

export default paymentSlice.reducer;