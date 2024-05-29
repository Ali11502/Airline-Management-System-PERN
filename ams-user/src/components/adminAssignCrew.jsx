import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from './adminNav';
import { useSelector } from 'react-redux';

const AdminAssignCrew = () => {
  const {crewInfo} = useSelector((state)=>state.crew)
  const {employeeid} = crewInfo;

  const [formData, setFormData] = useState({
    employeeid: employeeid,
    flightid: '',
    assignmentStatus: 'pending',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/erpAssignment/crewAssignments',
        formData
      );

      toast.success('Crew assigned to flight successfully!');
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      toast.error(`Error assigning crew to flight: ${error.response.data.message}`);
      console.error('Error assigning crew to flight:', error.response.data.message);
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="container p-4 mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 font-mono">
          Assign Crew to Flight
        </h2>
        <div className="bg-white text-black p-4 rounded shadow mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-2">Employee ID (Crew):</label>
              <input
                type="text"
                name="employeeid"
                value={formData.employeeid}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Flight ID:</label>
              <input
                type="text"
                name="flightid"
                value={formData.flightid}
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
              Assign Crew to Flight
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAssignCrew;
