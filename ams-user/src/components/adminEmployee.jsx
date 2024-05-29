import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from './adminNav';

const AdminEmployee = () => {
  const [formData, setFormData] = useState({
    managerid: null,
    name: '',
    email: '',
    password: '',
    type: 'manager', // Default to manager type
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dynamically generate the route based on the selected employee type
      const response = await axios.post(
        `http://localhost:5000/api/erpAuth/add-${formData.type}`,
        formData
      );

      toast.success('Employee registered successfully!');
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      toast.error(`Error registering employee: ${error.response.data.message}`);
      console.error('Error registering employee:', error.response.data.message);
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="container p-4 mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 font-mono">
      Employee Registration
          </h2>
        <div className="bg-white text-black p-4 rounded shadow mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-2">Manager ID:</label>
              <input
                type="text"
                name="managerid"
                value={formData.managerid}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Employee Type:</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              >
                <option value="manager">Manager</option>
                <option value="pilot">Pilot</option>
                <option value="crew">Crew</option>
                <option value="engineer">Engineer</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Register Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEmployee;
