import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useUpdateUserMutation } from '../store/slices/usersApiSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from './navbar';


const UpdatePassenger = () => {
    const navigate = useNavigate();
    const { passengerInfo } = useSelector((state) => state.passenger);
    const { userInfo } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pid, setPid] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
    
    const dispatch = useDispatch();

    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
      if (passengerInfo) {
          setName(passengerInfo.name || '');
          setEmail(passengerInfo.email || '');
          setPhone(passengerInfo.phone || '');
          setPid(passengerInfo.passport || '');
          setDob(passengerInfo.dob ? new Date(passengerInfo.dob).toISOString().split('T')[0] : '');
          setGender(passengerInfo.gender || '');
      }
  }, [passengerInfo]);
  
    const submitHandler = async (e) => {
        e.preventDefault();
        const req = {
            "id": userInfo.id,
            "name": name,
            "phone": phone,
            "email": email,
            "passport": pid,
            "dob": dob,
            "gender": gender
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/passengers/passenger/${passengerInfo.passengerid}`, req);
            toast.success("Passenger Updated Successfully")
            navigate('/manage')
          } catch (error) {
            toast.error('Error fetching data:', error);
          }
      };

  return (
    <div>
    <Navbar/>
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 font-mono">Update User Information</h2>
         {/* Passenger Form */}
         <div className="max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md">
          <form onSubmit={submitHandler}>
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
              Update Passenger
            </button>
          </form>
        </div>
      </div>

      
    </div>
    </div>
  );
};

export default UpdatePassenger;
