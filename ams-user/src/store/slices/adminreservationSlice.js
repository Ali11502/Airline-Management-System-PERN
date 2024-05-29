import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminreservationInfo: localStorage.getItem('adminreservationInfo')
    ? JSON.parse(localStorage.getItem('adminreservationInfo'))
    : null,
};

const adminreservationSlice = createSlice({
  name: 'adminreservation',
  initialState,
  reducers: {
    setadminreservationInfo: (state, action) => {
      state.selectionInfo = action.payload;
      localStorage.setItem('adminreservationInfo', JSON.stringify(action.payload));
      
    },
  },
});

export const { setadminreservationInfo } = adminreservationSlice.actions;

export default adminreservationSlice.reducer;