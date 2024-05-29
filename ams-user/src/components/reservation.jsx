import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setreservationInfo } from '../store/slices/reservationSlice';
import { useDispatch } from 'react-redux';
import Navbar from './navbar';

const ReservationForm = () => {

const navigate = useNavigate();
const dispatch = useDispatch();
  
const [selectedFlight, setSelectedFlight] = useState({});

const { selectionInfo } = useSelector((state) => state.selection);
const {flightid} = selectionInfo;
const { userInfo } = useSelector((state) => state.auth);

useEffect(() => {
  if (!userInfo) {
    navigate('/signin');
  }
}, [navigate, userInfo]);


useEffect(() => {
  axios.get(`http://localhost:5000/api/flights/${flightid}`)
    .then(response => {
      console.log(response);
      const { data } = response;
      console.log(data); 
      setSelectedFlight(data);
      
    })
    .catch(error => {
      console.error('Error fetching flight:', error);
      // Handle errors
    });
}, [flightid]);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pid, setPid] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const {id} = userInfo || {};

  const formData = {
    "id":id,
    "name": name,
    "phone": phone,
    "email": email,
    "passport": pid,
    "dob": dob,
    "gender": gender,
    "flightid": flightid,
    "date": new Date().toLocaleDateString(),
    "time": new Date().toLocaleTimeString(), 
  }


const handleSubmit = (e) => {
  e.preventDefault();

  try {
    axios.post('http://localhost:5000/api/reservations/tentative-reservation',formData)
    .then(response => {
      dispatch(setreservationInfo(response))
      navigate('/payment')
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
    
  } catch (error) {
    toast.error("There was error please try again", error);
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
      <Navbar/>
    <div className="relative h-screen bg-white mb-[43vh]">
      {/* Content */}
      <div className="px-4 py-6 sm:py-12">
        {/* Flight Info */}
        <div
      className="bg-gray-100 p-10 rounded-lg shadow-md mb-4 max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-black pb-3">{selectedFlight.deptime} - {selectedFlight.arrtime} - {formatDate(selectedFlight.date)}</h2>
          <p className="text-gray-700 pb-3 text-lg">PK{selectedFlight.aircraftid} | {selectedFlight.duration} mins</p>
          <p className="text-gray-700 text-lg">{selectedFlight.dep} to {selectedFlight.arr}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-black pb-3 text-lg">{selectedFlight.price}</p>
        </div>
      </div>
    </div>

        {/* Passenger Form */}
        <div className="max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
  <div>
    <label className="block text-black text-sm font-medium mb-1">Email</label>
    <input
      type="text"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 rounded-lg border border-gray-300 text-black"
      required
    />
  </div>

  <div>
    <label className="block text-black text-sm font-medium mb-1">Name</label>
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
    <label className="block text-black text-sm font-medium mb-1">Phone</label>
    <input
      type="text"
      name="phone"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="w-full p-2 rounded-lg border border-gray-300 text-black"
      required
    />
  </div>

  <div>
    <label className="block text-black text-sm font-medium mb-1">Passport ID</label>
    <input
      type="text"
      name="passportId"
      value={pid}
      onChange={(e) => setPid(e.target.value)}
      className="w-full p-2 rounded-lg border border-gray-300 text-black"
      required
    />
  </div>

  <div>
    <label className="block text-black text-sm font-medium mb-1">Date of Birth</label>
    <input
      type="date"
      name="dob"
      value={dob}
      onChange={(e) => setDob(e.target.value)}
      className="w-full p-2 rounded-lg border border-gray-300 text-black"
      required
    />
  </div>

  <div>
    <label className="block text-black text-sm font-medium mb-1">Gender</label>
    <input
      type="text"
      name="gender"
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      className="w-full p-2 rounded-lg border border-gray-300 text-black"
      required
    />
  </div>
</div>

            <button
              type="submit"
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300"
            >
              Make Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ReservationForm;
