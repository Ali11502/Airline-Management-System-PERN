import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from './adminNav';
import { useSelector } from 'react-redux';

const AdminCrewAssignment = () => {
  const { crewInfo } = useSelector((state) => state.crew);
  const { employeeid } = crewInfo;
  const crewId = employeeid;

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/erpAssignment/crewAssignments/${crewId}`);
        setAssignments(response.data);
      } catch (error) {
        toast.error(`Error fetching crew assignments: ${error.message}`);
        console.error('Error fetching crew assignments:', error.message);
      }
    };

    fetchData();
  }, [crewId]);

  const handleDelete = async (assignmentid) => {
    try {
      await axios.delete(`http://localhost:5000/api/erpAssignment/deleteCrewAssignment/${assignmentid}`);
      toast.success('Assignment deleted successfully!');

      setAssignments((prevAssignments) =>
        prevAssignments.filter((assignment) => assignment.assignmentid !== assignmentid)
      );
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


  return (
    <div>
      <AdminNav />
      <div className="container p-4 mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 font-mono">
          Crew Assignments
        </h2>
        <div className="bg-white text-black p-4 rounded shadow mx-auto">
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-2">Assignment ID</th>
                <th className="border p-2">Employee ID (Crew)</th>
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
                      onClick={() => handleDelete(assignment.assignmentid)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 mr-4 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleCrewComplete(assignment)}
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

export default AdminCrewAssignment;
