import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from './adminNav';
import { useSelector } from 'react-redux';

const AdminEngineerAssignment = () => {
  const { engineerInfo } = useSelector((state) => state.engineer);
  const { employeeid } = engineerInfo;
  const engineerId = employeeid;

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/erpAssignment/engineerAssignments/${engineerId}`);
        setAssignments(response.data);
      } catch (error) {
        toast.error(`Error fetching engineer assignments: ${error.message}`);
        console.error('Error fetching engineer assignments:', error.message);
      }
    };

    fetchData();
  }, [engineerId]);

  const handleDelete = async (assignmentid) => {
    
    try {
      await axios.delete(`http://localhost:5000/api/erpAssignment/deleteEngineerAssignment/${assignmentid}`);
      toast.success('Assignment deleted successfully!');

      setAssignments((prevAssignments) =>
        prevAssignments.filter((assignment) => assignment.assignmentid !== assignmentid)
      );
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
      <AdminNav />
      <div className="container p-4 mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 font-mono">
          Engineer Assignments
        </h2>
        <div className="bg-white text-black p-4 rounded shadow mx-auto">
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-2">Assignment ID</th>
                <th className="border p-2">Employee ID (Engineer)</th>
                <th className="border p-2">Aircraft ID</th>
                <th className="border p-2">Assignment Date</th>
                <th className="border p-2">Completion Date</th>
                <th className="border p-2">Assignment Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.assignmentid}>
                  <td className="border p-2">{assignment.assignmentid}</td>
                  <td className="border p-2">{assignment.employeeid}</td>
                  <td className="border p-2">{assignment.aircraftid}</td>
                  <td className="border p-2">{formatDate(assignment.assignmentdate)}</td>
                  <td className="border p-2">{formatDate(assignment.completiondate)}</td>
                  <td className="border p-2">{assignment.assignmentstatus}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(assignment.assignmentid)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 mr-2 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEngineerComplete(assignment.assignmentid)}
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

export default AdminEngineerAssignment;
