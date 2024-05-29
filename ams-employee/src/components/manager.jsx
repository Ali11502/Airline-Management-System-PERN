import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserInfoCard from './usercard';
import { useDispatch } from 'react-redux';
import { setemployeeInfo } from '../store/slices/employeeSlice';


const ManagerDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    if (!userInfo) {
        navigate('/');
    }
    



  const [pilotAssignments, setPilotAssignments] = useState([]);
  const [crewAssignments, setCrewAssignments] = useState([]);
  const [engineerAssignments, setEngineerAssignments] = useState([]);
  let managerId = null;

  useEffect(() => {
    if(userInfo){
    const fetchPilotAssignments = async () => {
        const {employeeid} = userInfo;
        managerId = employeeid;
      try {
        const response = await axios.get(`http://localhost:5000/api/erpAssignment/manager/pilotAssignments/${managerId}`);
        setPilotAssignments(response.data);
      } catch (error) {
        console.error('Error fetching pilot assignments:', error);
      }
    };

    const fetchCrewAssignments = async () => {
        const {employeeid} = userInfo;
    const managerId = employeeid;
      try {
        const response = await axios.get(`http://localhost:5000/api/erpAssignment/manager/crewAssignments/${managerId}`);
        setCrewAssignments(response.data);
      } catch (error) {
        console.error('Error fetching crew assignments:', error);
      }
    };

    const fetchEngineerAssignments = async () => {
        const {employeeid} = userInfo;
    const managerId = employeeid;
      try {
        const response = await axios.get(`http://localhost:5000/api/erpAssignment/manager/engineerAssignments/${managerId}`);
        setEngineerAssignments(response.data);
      } catch (error) {
        console.error('Error fetching engineer assignments:', error);
      }
    };

    fetchPilotAssignments();
    fetchCrewAssignments();
    fetchEngineerAssignments();}
  }, [managerId, userInfo]);

 
  const handlePilotDelete = async(assignment) => {
    const {assignmentid} = assignment
    try {
        await axios.delete(`http://localhost:5000/api/erpAssignment/deletePilotAssignment/${assignmentid}`);
        toast.success('Assignment deleted successfully!');
  
      } catch (error) {
        toast.error(`Error deleting assignment: ${error.message}`);
        console.error('Error deleting assignment:', error.message);
      }
    
  };

  const handleCrewDelete = async(assignment) => {
    const {assignmentid} = assignment
    try {
        await axios.delete(`http://localhost:5000/api/erpAssignment/deleteCrewAssignment/${assignmentid}`);
        toast.success('Assignment deleted successfully!');
  
      } catch (error) {
        toast.error(`Error deleting assignment: ${error.message}`);
        console.error('Error deleting assignment:', error.message);
      }
    
  };

  const handleEngineerDelete = async(assignment) => {
    const {assignmentid} = assignment
    try {
        await axios.delete(`http://localhost:5000/api/erpAssignment/deleteEngineerAssignment/${assignmentid}`);
        toast.success('Assignment deleted successfully!');
  
      } catch (error) {
        toast.error(`Error deleting assignment: ${error.message}`);
        console.error('Error deleting assignment:', error.message);
      }
    
  };

  const handlePilotComplete = async(assignment) => {
    const {assignmentid} = assignment
    try {
        await axios.put(`http://localhost:5000/api/erpAssignment/completePilotAssignment/${assignmentid}`);
        toast.success('Assignment Updated successfully!');
  
      } catch (error) {
        toast.error(`Error deleting assignment: ${error.message}`);
        console.error('Error deleting assignment:', error.message);
      }
    
  };

  const handleCrewComplete = async(assignment) => {
    const {assignmentid} = assignment
    try {
        await axios.put(`http://localhost:5000/api/erpAssignment/completeCrewAssignment/${assignmentid}`);
        toast.success('Assignment Updated successfully!');
  
      } catch (error) {
        toast.error(`Error deleting assignment: ${error.message}`);
        console.error('Error deleting assignment:', error.message);
      }
    
  };

  const handleEngineerComplete = async(assignment) => {
    const {assignmentid} = assignment
    try {
        await axios.put(`http://localhost:5000/api/erpAssignment/completeEngineerAssignment/${assignmentid}`);
        toast.success('Assignment Updated successfully!');
  
      } catch (error) {
        toast.error(`Error deleting assignment: ${error.message}`);
        console.error('Error deleting assignment:', error.message);
      }
    
  };

  const handleUpdateEmployee = async(employeeid)=>{
    axios.get(`http://localhost:5000/api/erpEmployee/${employeeid}`)
  .then(response => {
    dispatch(setemployeeInfo(response.data))
    navigate('/update')
  })
  .catch(error => {
    
  });
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div>
      <Navbar />
      {/* Render Pilot Assignments Table */}
      {userInfo && <UserInfoCard userInfo={userInfo} />}
      <div className="bg-white text-black p-4 m-9 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Pilot Assignments</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee ID</th>
              <th className="p-2 border">Flight ID</th>
              <th className="p-2 border">Assignment Status</th>
              <th className="p-2 border">Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {pilotAssignments.map((assignment) => (
              <tr key={assignment.flightid} className="bg-gray-100">
                <td className="py-2 border text-center text-sm">{assignment.employeeid}</td>
                <td className="py-2 border text-center text-sm">{assignment.flightid}</td>
                <td className="py-2 border text-center text-sm">{assignment.assignmentstatus}</td>
                <td className="py-2 border text-center text-sm">
                  {/* Action buttons */}
                  <button
                    onClick={() => handlePilotComplete(assignment)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => handlePilotDelete(assignment)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 mr-2 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdateEmployee(assignment.employeeid)}
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded"
                  >
                    View Employee
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render Crew Assignments Table */}
      <div className="bg-white text-black p-4 m-9 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Crew Assignments</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee ID</th>
              <th className="p-2 border">Flight ID</th>
              <th className="p-2 border">Assignment Status</th>
              <th className="p-2 border">Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {crewAssignments.map((assignment) => (
              <tr key={assignment.flightid} className="bg-gray-100">
                <td className="py-2 border text-center text-sm">{assignment.employeeid}</td>
                <td className="py-2 border text-center text-sm">{assignment.flightid}</td>
                <td className="py-2 border text-center text-sm">{assignment.assignmentstatus}</td>
                <td className="py-2 border text-center text-sm">
                  {/* Action buttons */}
                  <button
                    onClick={() => handleCrewComplete(assignment.assignmentid)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => handleCrewDelete(assignment)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdateEmployee(assignment.employeeid)}
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded"
                  >
                    View Employee
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render Engineer Assignments Table */}
      <div className="bg-white text-black p-4 m-9 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Engineer Assignments</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee ID</th>
              <th className="p-2 border">Aircraft ID</th>
              <th className="p-2 border">Assignment Date</th>
              <th className="p-2 border">Completion Date</th>
              <th className="p-2 border">Assignment Status</th>
              <th className="p-2 border">Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {engineerAssignments.map((assignment) => (
              <tr key={assignment.aircraftid} className="bg-gray-100">
                <td className="py-2 border text-center text-sm">{assignment.employeeid}</td>
                <td className="py-2 border text-center text-sm">{assignment.aircraftid}</td>
                <td className="py-2 border text-center text-sm">{formatDate(assignment.assignmentdate)}</td>
                <td className="py-2 border text-center text-sm">{formatDate(assignment.completiondate)}</td>
                <td className="py-2 border text-center text-sm">{assignment.assignmentstatus}</td>
                <td className="py-2 border text-center text-sm">
                  {/* Action buttons */}
                  <button
                    onClick={() => handleEngineerComplete(assignment)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => handleEngineerDelete(assignment)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdateEmployee(assignment.employeeid)}
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded"
                  >
                    View Employee
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerDashboard;
