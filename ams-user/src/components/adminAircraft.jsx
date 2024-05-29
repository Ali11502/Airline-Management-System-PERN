import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import AdminNav from './adminNav';

const AdminUpdateAircraft = () => {
  const navigate = useNavigate();
  const { aircraftInfo } = useSelector((state) => state.aircraft);

  const [name, setName] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [status, setStatus] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const req = {
      aname: name,
      totalseats: totalSeats,
      astatus: status,
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/aircrafts/${aircraftInfo.aircraftid}`, req);
      toast.success('Aircraft Updated Successfully');
      navigate('/adminDashboard');
    } catch (error) {
      toast.error('Error updating aircraft:', error);
    }
  };

  useEffect(() => {
    if (aircraftInfo) {
      setName(aircraftInfo.aname || '');
      setTotalSeats(aircraftInfo.totalseats || '');
      setStatus(aircraftInfo.astatus || '');
    }
  }, [aircraftInfo]);

  return (
    <div>
      <AdminNav />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 font-mono">Update Aircraft Information</h2>
          {/* Aircraft Form */}
          <div className="max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md">
            <form onSubmit={submitHandler}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-black text-sm font-medium mb-1">Aircraft Name</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-1">Total Seats</label>
                  <input
                    type="text"
                    name="totalSeats"
                    value={totalSeats}
                    onChange={(e) => setTotalSeats(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-1">Status</label>
                  <input
                    type="text"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300"
              >
                Update Aircraft
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateAircraft;
