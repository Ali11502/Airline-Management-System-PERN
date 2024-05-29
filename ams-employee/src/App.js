import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignIn from './components/signIn';
import Manager from './components/manager';
import PilotAssignments from './components/pilot';
import CrewAssignments from './components/crew';
import EngineerAssignments from './components/engineer';
import UpdateEmployee from './components/employee';


function App() {

  

  return (
    <Router>
      {/* <Navbar/> */}
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path='/manager' element={<Manager/>}/>
        <Route path='/pilot' element={<PilotAssignments/>}/>
        <Route path='/crew' element={<CrewAssignments/>}/>
        <Route path='/engineer' element={<EngineerAssignments/>}/>
        <Route path='/update' element={<UpdateEmployee/>}/>
      </Routes>
    </Router>
  );
}

export default App;
