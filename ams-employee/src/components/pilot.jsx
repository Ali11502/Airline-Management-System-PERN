import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './navbar';
import UserInfoCard from './usercard';

const PilotAssignments = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    if (!userInfo) {
        navigate('/');
    }
    
  const [pilotAssignments, setPilotAssignments] = useState([]);
  let pilotId = null;

  useEffect(() => {
    if (userInfo) {
      const { employeeid } = userInfo;
      pilotId = employeeid;
      const fetchPilotAssignments = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/erpAssignment/pilotAssignments/${pilotId}`);
          setPilotAssignments(response.data);
        } catch (error) {
          console.error('Error fetching pilot assignments:', error);
        }
      };

      fetchPilotAssignments();
    }
  }, [userInfo, pilotId]);


  

  // Rest of the code remains similar to your existing component but only for pilot assignments

  return (
    <div>
    <Navbar/>
    {userInfo && <UserInfoCard userInfo={userInfo} />}
    <div className="bg-white text-black p-4 m-9 rounded shadow">
    <h3 className="text-lg font-semibold mb-4">Pilot Assignments</h3>
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Employee ID</th>
          <th className="p-2 border">Flight ID</th>
          <th className="p-2 border">Assignment Status</th>
        </tr>
      </thead>
      <tbody>
        {pilotAssignments.map((assignment) => (
          <tr key={assignment.assignmentid} className="bg-gray-100">
            <td className="py-2 border text-center text-sm">{assignment.employeeid}</td>
            <td className="py-2 border text-center text-sm">{assignment.flightid}</td>
            <td className="py-2 border text-center text-sm">{assignment.assignmentstatus}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
  );
};

export default PilotAssignments;
