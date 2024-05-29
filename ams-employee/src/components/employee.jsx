import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './navbar';
import { useSelector } from 'react-redux';

const UpdateEmployee = () => {
  const { employeeInfo } = useSelector((state) => state.employee);
  const { employeeid, name, email, managerid } = employeeInfo;

  const [formData, setFormData] = useState({
    employeeId: employeeid,
    name: name,
    email: email,
    password: '',
    managerId: managerid,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/erpEmployee/update/${formData.employeeId}`,
        formData
      );

      toast.success('Employee updated successfully!');
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      toast.error(`Error updating employee: ${error.response.data.message}`);
      console.error('Error updating employee:', error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="container p-4 mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 font-mono">
          Update Employee Information
        </h2>
        <div className="bg-white text-black p-4 rounded shadow mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-2">Employee ID:</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                readOnly
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
            {/* Add input for managerId */}
            <div className="mb-4">
              <label className="block text-sm mb-2">Manager ID:</label>
              <input
                type="text"
                name="managerId"
                value={formData.managerId}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Update Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
