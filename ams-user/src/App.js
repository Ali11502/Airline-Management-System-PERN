import React from 'react';
import Home from "./components/home";
import AdminDashboard from './components/admin';
import Footer from "./components/footer";
import FlightOptions from "./components/flights";
import ReservationForm from "./components/reservation";
import PaymentPage from "./components/paymentPage";
import SignUp from "./components/signUp";
import SignIn from "./components/signIn";
import UpdateUser from './components/user';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Manage from './components/manage';
import UpdatePassenger from './components/passenger';
import Payment from './components/laterPayment';
import ReservationTable from './components/adminReservations';
import AdminUpdatePassenger from './components/adminPassenger';
import AdminUpdateFlight from './components/adminFlight';
import AdminUpdateAircraft from './components/adminAircraft';
import AdminCreateFlight from './components/adminCreateFlight';
import AdminCreateAircraft from './components/adminCreateAircraft';
import AdminFlightPayments from './components/adminFlightPayments';
import AdminEmployee from './components/adminEmployee';
import AdminUpdateEmployee from './components/adminEmployeeUpdate';
import AdminAssignPilot from './components/adminAssignPilot';
import AdminAssignCrew from './components/adminAssignCrew';
import AdminAssignEngineer from './components/adminAssignEngineer';
import AdminPilotAssignment from './components/adminPilotAssignments';
import AdminEngineerAssignment from './components/adminEngineerAssignment';
import AdminCrewAssignment from './components/adminCrewAssignment';

function App() {

  

  return (
    <Router>
      {/* <Navbar/> */}
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/flights" element={<FlightOptions/>} />
        <Route path="/reservation" element={<ReservationForm/>} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user" element={<UpdateUser/>}/>
        <Route path="/manage" element={<Manage/>}/>
        <Route path="/passenger" element={<UpdatePassenger/>}/>
        <Route path="/laterPayment" element={<Payment/>}/>
        <Route path="/adminReservation" element={<ReservationTable/>}/>
        <Route path="/adminUpdatePassenger" element={<AdminUpdatePassenger/>}/>
        <Route path="/adminUpdateFlight" element={<AdminUpdateFlight/>}/>
        <Route path="/adminUpdateAircraft" element={<AdminUpdateAircraft/>}/>
        <Route path="/adminCreateFlight" element={<AdminCreateFlight/>}/>
        <Route path="/adminCreateAircraft" element={<AdminCreateAircraft/>}/>
        <Route path="/adminFlightPayments" element={<AdminFlightPayments/>}/>
        <Route path="/adminEmployee" element={<AdminEmployee/>}/>
        <Route path="/adminUpdateEmployee" element={<AdminUpdateEmployee/>}/>
        <Route path="/adminAssignPilot" element={<AdminAssignPilot/>}/>
        <Route path="/adminAssignCrew" element={<AdminAssignCrew/>}/>
        <Route path="/adminAssignEngineer" element={<AdminAssignEngineer/>}/>
        <Route path="/adminPilotAssignments" element={<AdminPilotAssignment/>}/>
        <Route path="/adminEngineerAssignments" element={<AdminEngineerAssignment/>}/>
        <Route path="/adminCrewAssignments" element={<AdminCrewAssignment/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
