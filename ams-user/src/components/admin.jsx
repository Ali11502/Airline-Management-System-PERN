import React, { useState, useEffect } from 'react';
import axios from 'axios';
import adminBg from '../assets/img4.jpg';
import AdminNav from './adminNav';
import { setadminreservationInfo } from '../store/slices/adminreservationSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setSelectionInfo } from '../store/slices/selectionSlice';
import { setaircraftInfo } from '../store/slices/aircraftSlice';
import { setpaymentInfo } from '../store/slices/paymentSlice';
import { setemployeeInfo } from '../store/slices/employeeSlice';
import { setpilotInfo } from '../store/slices/pilotSlice';
import { setcrewInfo } from '../store/slices/crewSlice';
import { setengineerInfo } from '../store/slices/engineerSlice';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [flights, setFlights] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const flightResponse = await axios.get('http://localhost:5000/api/flights/');
        setFlights(flightResponse.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    const fetchAircrafts = async () => {
      try {
        const aircraftResponse = await axios.get('http://localhost:5000/api/aircrafts/');
        setAircrafts(aircraftResponse.data);
      } catch (error) {
        console.error('Error fetching aircrafts:', error);
      }
    };

    fetchFlights();
    fetchAircrafts();
  }, []);

  const [managers, setManagers] = useState([]);
  const [pilots, setPilots] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [crews, setCrews] = useState([]);

  useEffect(() => {
    // Fetch data for managers
    const fetchManagers = async () => {
      try {
        const managerResponse = await axios.get('http://localhost:5000/api/erpEmployee/managers');
        setManagers(managerResponse.data);
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    };

    // Fetch data for pilots
    const fetchPilots = async () => {
      try {
        const pilotResponse = await axios.get('http://localhost:5000/api/erpEmployee/pilots');
        setPilots(pilotResponse.data);
      } catch (error) {
        console.error('Error fetching pilots:', error);
      }
    };

    // Fetch data for engineers
    const fetchEngineers = async () => {
      try {
        const engineerResponse = await axios.get('http://localhost:5000/api/erpEmployee/engineers');
        setEngineers(engineerResponse.data);
      } catch (error) {
        console.error('Error fetching engineers:', error);
      }
    };

    // Fetch data for crews
    const fetchCrews = async () => {
      try {
        const crewResponse = await axios.get('http://localhost:5000/api/erpEmployee/crews');
        setCrews(crewResponse.data);
      } catch (error) {
        console.error('Error fetching crews:', error);
      }
    };

    fetchManagers();
    fetchPilots();
    fetchEngineers();
    fetchCrews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleReservation = async (flightId) => {
    const req = {"flightid":flightId}
    try {
      dispatch(setadminreservationInfo(req));
      navigate('/adminReservation')
    } catch (error) {
      toast.error("Error fetching reservations" , error);
    }
  };

  const handleModify = async (flight) => {

    try {
      dispatch(setSelectionInfo(flight));
      navigate('/adminUpdateFlight');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handlePayment = async (flightid) => {
    const req = {"flightid":flightid}
    try {
      dispatch(setpaymentInfo(req));
      navigate('/adminFlightPayments');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleComplete = async (flightId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/flights/complete/${flightId}`);
      
      if (response.status === 200) {
        // Flight status updated successfully
        toast.success('Flight status updated to Completed');
        
        // Optional: You can update the flights state or fetch updated flights
        const updatedFlights = flights.map(flight =>
          flight.flightid === flightId ? { ...flight, status: 'Completed' } : flight
        );
        setFlights(updatedFlights);
      } else {
        toast.error('Failed to update flight status');
      }
    } catch (error) {
      toast.error('Error updating flight status:', error);
    }
  };

  const handleDeleteAircraft = async (aircraftId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/aircrafts/${aircraftId}`);

      if (response.status === 200) {
        // Aircraft deleted successfully
        toast.success('Aircraft deleted successfully');

        // Optional: You can update the aircrafts state or refetch the aircrafts
        const updatedAircrafts = aircrafts.filter(aircraft => aircraft.aircraftid !== aircraftId);
        setAircrafts(updatedAircrafts);
      } else {
        toast.error('Failed to delete aircraft');
      }
    } catch (error) {
      toast.error('Error deleting aircraft! Please make sure there are no flights scheduled for this aircraft', error);
    }
  };

  const handleModifyAircraft = async (aircraft) => {
    
    try {
      dispatch(setaircraftInfo(aircraft));
      navigate('/adminUpdateAircraft');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/erpEmployee/delete/${employeeId}`);
  
      if (response.status === 200) {
        // Employee deleted successfully
        toast.success('Employee deleted successfully');
  
        window.location.reload();
      } else {
        toast.error('Failed to delete employee');
      }
    } catch (error) {
      toast.error('Error deleting employee', error);
    }
  };

  const modifyEmployee = async (employee) => {
    try {
      dispatch(setemployeeInfo(employee));
      navigate('/adminUpdateEmployee');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handlePilotAssignment = async (employeeid) => {
    const req = {"employeeid":employeeid}
    try {
      dispatch(setpilotInfo(req));
      navigate('/adminAssignPilot');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleViewPilotAssignment = async (employeeid) => {
    const req = {"employeeid":employeeid}
    try {
      dispatch(setpilotInfo(req));
      navigate('/adminPilotAssignments');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleCrewAssignment = async (employeeid) => {
    const req = {"employeeid":employeeid}
    try {
      dispatch(setcrewInfo(req));
      navigate('/adminAssignCrew');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleViewCrewAssignment = async (employeeid) => {
    const req = {"employeeid":employeeid}
    try {
      dispatch(setcrewInfo(req));
      navigate('/adminCrewAssignments');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleEngineerAssignment = async (employeeid) => {
    const req = {"employeeid":employeeid}
    try {
      dispatch(setengineerInfo(req));
      navigate('/adminAssignEngineer');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleViewEngineerAssignment = async (employeeid) => {
    const req = {"employeeid":employeeid}
    try {
      dispatch(setengineerInfo(req));
      navigate('/adminEngineerAssignments');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  return (
    <div>
      <AdminNav/>
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${adminBg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 text-white">
        <div className="text-center">
          <h1 className="text-2xl md:text-5xl font-extrabold tracking-tight py-[6vh] mb-2 sm:mb-4 font-mono">
            Admin Dashboard
          </h1>
        </div>

          <div className="container mx-auto p-4">

            <div className="bg-white text-black p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Flights</h3>
              <table className="w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">From</th>
                    <th className="p-2 border">To</th>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Departure Time</th>
                    <th className="p-2 border">Arrival Time</th>
                    <th className="p-2 border">Available Seats</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Duration</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {flights.map((flight) => (
                    <tr key={flight.flightid} className="bg-gray-100">
                      <td className="py-2 border text-center text-sm">{flight.flightid}</td>
                      <td className="py-2 border text-center text-sm">{flight.dep}</td>
                      <td className="py-2 border text-center text-sm">{flight.arr}</td>
                      <td className="py-2 border text-center text-sm">{formatDate(flight.date)}</td>
                      <td className="py-2 border text-center text-sm">{flight.deptime}</td>
                      <td className="py-2 border text-center text-sm">{flight.arrtime}</td>
                      <td className="py-2 border text-center text-sm">{flight.avbseats}</td>
                      <td className="py-2 border text-center text-sm">{flight.status}</td>
                      <td className="py-2 border text-center text-sm">{flight.duration} hrs</td>
                      <td className="py-2 border text-center text-sm">PKR{flight.price}</td>
                      <td className="py-2 border">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded"  onClick={() => handleModify(flight)}>
                          Modify
                        </button>
                        <button
  className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 ml-1 rounded"
  onClick={() => handleComplete(flight.flightid)}
>
  Completed
</button>
                        <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded ml-1"
                onClick={() => handleReservation(flight.flightid)}
              >
                Reservations
              </button>
              <button
                className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-2 rounded ml-1"
                onClick={() => handlePayment(flight.flightid)}
              >
                Payments
              </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          <div className="bg-white text-black p-4 mt-9 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Aircrafts</h3>
              <table className="w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Total Seats</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
  {aircrafts.map((aircraft) => (
    <tr key={aircraft.aircraftid} className="bg-gray-100">
      <td className="p-2 border text-center text-sm">{aircraft.aircraftid}</td>
      <td className="p-2 border text-center text-sm">{aircraft.aname}</td>
      <td className="p-2 border text-center text-sm">{aircraft.totalseats}</td>
      <td className="p-2 border text-center text-sm">{aircraft.astatus}</td>
      <td className="border text-center">
                        <button 
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded"
                        onClick={() => handleModifyAircraft(aircraft)}
                        >
                          Modify Aircraft
                        </button>
                        <button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded ml-2"
                        onClick={() => handleDeleteAircraft(aircraft.aircraftid)}
                        >
                          Delete Aircraft
                        </button>
                      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
            <div className="bg-white text-black p-4 mt-9 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Managers</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Manager ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr key={manager.id} className="bg-gray-100">
                <td className="p-2 border text-center text-sm">{manager.employeeid}</td>
                <td className="p-2 border text-center text-sm">{manager.managerid}</td>
                <td className="p-2 border text-center text-sm">{manager.name}</td>
                <td className="p-2 border text-center text-sm">{manager.email}</td>
                <td className="border text-center">
                        <button 
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded"
                        onClick={() => modifyEmployee(manager)}
                        >
                          Modify Employee
                        </button>
                        <button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded ml-2"
                        onClick={() => deleteEmployee(manager.employeeid)}
                        >
                          Delete Employee
                        </button>
                      </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white text-black p-4 mt-9 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Pilots</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Manager ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pilots.map((pilot) => (
              <tr key={pilot.id} className="bg-gray-100">
                <td className="p-2 border text-center text-sm">{pilot.employeeid}</td>
                <td className="p-2 border text-center text-sm">{pilot.managerid}</td>
                <td className="p-2 border text-center text-sm">{pilot.name}</td>
                <td className="p-2 border text-center text-sm">{pilot.email}</td>
                <td className="border text-center">
                        <button 
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded"
                        onClick={() => modifyEmployee(pilot)}
                        >
                          Modify
                        </button>
                        <button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded ml-2"
                        onClick={() => deleteEmployee(pilot.employeeid)}
                        >
                          Delete
                        </button>
                        <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded ml-2"
                        onClick={() => handleViewPilotAssignment(pilot.employeeid)}
                        >
                          View Assignments
                        </button>
                        <button
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded ml-2"
                        onClick={() => handlePilotAssignment(pilot.employeeid)}
                        >
                          Add Assignments
                        </button>
                      </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white text-black p-4 mt-9 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Crews</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Manager ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {crews.map((crew) => (
              <tr key={crew.id} className="bg-gray-100">
                <td className="p-2 border text-center text-sm">{crew.employeeid}</td>
                <td className="p-2 border text-center text-sm">{crew.managerid}</td>
                <td className="p-2 border text-center text-sm">{crew.name}</td>
                <td className="p-2 border text-center text-sm">{crew.email}</td>
                <td className="border text-center">
                        <button 
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded"
                        onClick={() => modifyEmployee(crew)}
                        >
                          Modify
                        </button>
                        <button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded ml-2"
                        onClick={() => deleteEmployee(crew.employeeid)}
                        >
                          Delete
                        </button>
                        <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded ml-2"
                        onClick={() => handleViewCrewAssignment(crew.employeeid)}
                        >
                          View Assignments
                        </button>
                        <button
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded ml-2"
                        onClick={() => handleCrewAssignment(crew.employeeid)}
                        >
                          Add Assignments
                        </button>
                      </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white text-black p-4 mt-9 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Engineers</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Manager ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {engineers.map((engineer) => (
              <tr key={engineer.id} className="bg-gray-100">
                <td className="p-2 border text-center text-sm">{engineer.employeeid}</td>
                <td className="p-2 border text-center text-sm">{engineer.managerid}</td>
                <td className="p-2 border text-center text-sm">{engineer.name}</td>
                <td className="p-2 border text-center text-sm">{engineer.email}</td>
                <td className="border text-center">
                        <button 
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded"
                        onClick={() => modifyEmployee(engineer)}
                        >
                          Modify
                        </button>
                        <button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded ml-2"
                        onClick={() => deleteEmployee(engineer.employeeid)}
                        >
                          Delete
                        </button>
                        <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded ml-2"
                        onClick={() => handleViewEngineerAssignment(engineer.employeeid)}
                        >
                          View Assignments
                        </button>
                        <button
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded ml-2"
                        onClick={() => handleEngineerAssignment(engineer.employeeid)}
                        >
                          Add Assignments
                        </button>
                      </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
