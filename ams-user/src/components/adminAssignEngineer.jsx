import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from './adminNav';
import { useSelector } from 'react-redux';

const AdminAssignEngineer = () => {
    const {engineerInfo} = useSelector((state)=>state.engineer)
  const {employeeid} = engineerInfo
  const [formData, setFormData] = useState({
    employeeid: employeeid,
    
    aircraftid: '',
    assignmentDate: '',
    completionDate: '',
    assignmentStatus: 'pending',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/erpAssignment/engineerAssignments',
        formData
      );

      toast.success('Engineer assigned successfully!');
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      toast.error(`Error assigning engineer: ${error.response.data.message}`);
      console.error('Error assigning engineer:', error.response.data.message);
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="container p-4 mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 font-mono">
          Assign Engineer
        </h2>
        <div className="bg-white text-black p-4 rounded shadow mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-2">Employee ID (Engineer):</label>
              <input
                type="text"
                name="employeeid"
                value={formData.employeeid}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Aircraft ID:</label>
              <input
                type="text"
                name="aircraftid"
                value={formData.aircraftid}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Assignment Date:</label>
              <input
                type="date"
                name="assignmentDate"
                value={formData.assignmentDate}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Completion Date:</label>
              <input
                type="date"
                name="completionDate"
                value={formData.completionDate}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Assignment Status:</label>
              <select
                name="assignmentStatus"
                value={formData.assignmentStatus}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Assign Engineer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAssignEngineer;
