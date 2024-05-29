import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import flightsReducer from './slices/flightsSlice';
import selectionReducer from './slices/selectionSlice'
import reservationReducer from './slices/reservationSlice';
import passengerReducer from './slices/passengerSlice'
import adminreservationReducer from './slices/adminreservationSlice'
import aircraftReducer from './slices/aircraftSlice';
import paymentReducer from './slices/paymentSlice';
import employeeReducer from './slices/employeeSlice';
import pilotReducer from './slices/pilotSlice';
import crewReducer from './slices/crewSlice';
import engineerReducer from './slices/engineerSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    flights: flightsReducer,
    selection:selectionReducer,
    reservation:reservationReducer,
    passenger:passengerReducer,
    adminreservation:adminreservationReducer,
    aircraft:aircraftReducer,
    payment:paymentReducer,
    employee:employeeReducer,
    pilot:pilotReducer,
    crew:crewReducer,
    engineer:engineerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;