import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import AdminNav from './adminNav';

const AdminCreateAircraft = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [aname, setAname] = useState('');
  const [totalseats, setTotalseats] = useState('');
  const [astatus, setAstatus] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const req = {
      aname,
      totalseats,
      astatus,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/aircrafts/create', req);
      toast.success('Aircraft Created Successfully');
      navigate('/admin');
    } catch (error) {
      toast.error('Error creating aircraft:', error);
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 font-mono">Create New Aircraft</h2>
          {/* Aircraft Form */}
          <div className="max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md">
            <form onSubmit={submitHandler}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-black text-sm font-medium mb-1">Aircraft Name</label>
                  <input
                    type="text"
                    name="aname"
                    value={aname}
                    onChange={(e) => setAname(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-1">Total Seats</label>
                  <input
                    type="text"
                    name="totalseats"
                    value={totalseats}
                    onChange={(e) => setTotalseats(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-1">Status</label>
                  <input
                    type="text"
                    name="astatus"
                    value={astatus}
                    onChange={(e) => setAstatus(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300"
              >
                Create Aircraft
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateAircraft;
