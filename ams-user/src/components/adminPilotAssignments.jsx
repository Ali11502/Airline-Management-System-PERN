import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from './adminNav';
import { useSelector } from 'react-redux';

const AdminPilotAssignment = () => {
  const {pilotInfo} = useSelector((state)=>state.pilot);
  const {employeeid} = pilotInfo;
  const pilotId = employeeid;

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/erpAssignment/pilotAssignments/${pilotId}`);
        setAssignments(response.data);
      } catch (error) {
        toast.error(`Error fetching pilot assignments: ${error.message}`);
        console.error('Error fetching pilot assignments:', error.message);
      }
    };

    fetchData();
  }, [pilotId]);

  const handleDelete = async (assignment) => {
    const {assignmentid} = assignment
    try {
      const response = await axios.delete(`http://localhost:5000/api/erpAssignment/deletePilotAssignment/${assignmentid}`);
      toast.success('Assignment deleted successfully!');
      console.log(response.data); // Handle the response as needed

      // Update the assignments state after deletion
      setAssignments((prevAssignments) =>
        prevAssignments.filter((assignment) => assignment.assignmentid !== assignmentid)
      );
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

  return (
    <div>
      <AdminNav />
      <div className="container p-4 mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 font-mono">
          Pilot Assignments
        </h2>
        <div className="bg-white text-black p-4 rounded shadow mx-auto">
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-2">Assignment ID</th>
                <th className="border p-2">Employee ID (Pilot)</th>
                <th className="border p-2">Flight ID</th>
                <th className="border p-2">Assignment Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.assignmentid}>
                  <td className="border p-2">{assignment.assignmentid}</td>
                  <td className="border p-2">{assignment.employeeid}</td>
                  <td className="border p-2">{assignment.flightid}</td>
                  <td className="border p-2">{assignment.assignmentstatus}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(assignment)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 mr-3 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handlePilotComplete(assignment)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
                    >
                      Complete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPilotAssignment;
