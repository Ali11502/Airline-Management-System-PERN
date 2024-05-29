import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employeeInfo: localStorage.getItem('employeeInfo')
    ? JSON.parse(localStorage.getItem('employeeInfo'))
    : null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setemployeeInfo: (state, action) => {
      state.employeeInfo = action.payload;
      localStorage.setItem('employeeInfo', JSON.stringify(action.payload));
      
    },
  },
});

export const { setemployeeInfo } = employeeSlice.actions;

export default employeeSlice.reducer;