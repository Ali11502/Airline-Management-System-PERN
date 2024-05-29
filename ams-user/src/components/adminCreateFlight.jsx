import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import AdminNav from './adminNav';

const AdminCreateFlight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [aircraftId, setAircraftId] = useState('');
  const [dep, setDep] = useState('');
  const [arr, setArr] = useState('');
  const [depTime, setDepTime] = useState('');
  const [arrTime, setArrTime] = useState('');
  const [avbSeats, setAvbSeats] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const req = {
      aircraftId,
      dep,
      arr,
      depTime,
      arrTime,
      avbSeats,
      date,
      status,
      duration,
      price,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/flights/create', req);
      toast.success('Flight Created Successfully');
      navigate('/admin');
    } catch (error) {
      toast.error('Error creating flight:', error);
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 font-mono">Create New Flight</h2>
          {/* Flight Form */}
          <div className="max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md">
            <form onSubmit={submitHandler}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-black text-sm font-medium mb-1">Aircraft ID</label>
                  <input
                    type="text"
                    name="aircraftId"
                    value={aircraftId}
                    onChange={(e) => setAircraftId(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-1">Departure</label>
                  <input
                    type="text"
                    name="dep"
                    value={dep}
                    onChange={(e) => setDep(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-1">Arrival</label>
                  <input
                    type="text"
                    name="arr"
                    value={arr}
                    onChange={(e) => setArr(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-1">Departure Time</label>
                  <input
                    type="text"
                    name="depTime"
                    value={depTime}
                    onChange={(e) => setDepTime(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-1">Arrival Time</label>
                  <input
                    type="text"
                    name="arrTime"
                    value={arrTime}
                    onChange={(e) => setArrTime(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-1">Available Seats</label>
                  <input
                    type="text"
                    name="avbSeats"
                    value={avbSeats}
                    onChange={(e) => setAvbSeats(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-1">Date</label>
                  <input
                    type="text"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
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

                <div>
                  <label className="block text-black text-sm font-medium mb-1">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-1">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300"
              >
                Create Flight
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateFlight;
