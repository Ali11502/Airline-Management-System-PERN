import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setpassengerInfo } from '../store/slices/passengerSlice';
import { setreservationInfo } from '../store/slices/reservationSlice';
import Navbar from './navbar';

const Manage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userInfo) {
          navigate('/signin');
          return;
        }

        const { id } = userInfo;

        const response = await axios.get(`http://localhost:5000/api/reservations/passenger/${id}`);
        setPassengers(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userInfo, navigate]);

  

  const handleReservationUpdate = async(passengerid) => {
    const response = await axios.get(`http://localhost:5000/api/passengers/passenger/${passengerid}`);
    dispatch(setpassengerInfo(response.data));
    navigate('/passenger')
    
  };
  const handleReservationCancel = async (passengerid) => {
    try {
      // Get the reservationid from the response array
      const response = await axios.get(`http://localhost:5000/api/reservations/reservation/${passengerid}`);
      const reservationid = response.data[0].reservationid;
      console.log(reservationid);
  
      // Use reservationid in the next request
      const cancelResponse = await axios.post('http://localhost:5000/api/reservations/cancel-reservation', { reservationid });
      
      toast.success(cancelResponse.data.message);
      navigate('/');

    } catch (error) {
      console.error('Error handling reservation cancellation:', error.response ? error.response.data : error.message);
    }
  };
  const handleReservationPayment = async(passengerid) => {
    const response = await axios.get(`http://localhost:5000/api/reservations/reservation/${passengerid}`);
      const reservationid = response.data[0].reservationid;

      const paymentResponse = await axios.get(`http://localhost:5000/api/reservations/status/${reservationid}`,);
      const paymentCheck = paymentResponse.data.isConfirmedOrWaiting;

      if(paymentCheck===true){
        toast.info("You have paid already and your registration is confirmed!");
      }
      else{
        const data = {reservationid}
        dispatch(setreservationInfo(data));
        navigate('/laterPayment')
      }


      

  };

  return (
    <div>
    <Navbar/>
    <div className="relative bg-white">
      <div className="px-4 py-6 sm:py-12">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 font-mono text-black">
            Your Reservations
          </h1>
        </div>

        <div className="max-w-2xl mx-auto">
          {passengers.map((passenger, index) => (
            <div
              key={index}
              className="bg-gray-100 p-10 rounded-lg shadow-md mb-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-black pb-3">{passenger.name}</h2>
                  <p className="text-gray-700 pb-3 text-lg">Passport: {passenger.passport} | Gender: {passenger.gender}</p>
                  <p className="text-gray-700 text-lg">Phone: {passenger.phone}</p>
                </div>
                <div className="text-right flex flex-col">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-lg mt-2 transition duration-300 text-md px-8" onClick={() => handleReservationUpdate(passenger.passengerid)}>
                    Update Details
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-[21px] rounded-lg mt-2 transition duration-300 text-md px-8" onClick={() => handleReservationPayment(passenger.passengerid)}>
                    Make Payment
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-[21px] rounded-lg mt-2 transition duration-300 text-md px-8" onClick={() => handleReservationCancel(passenger.passengerid)}>
                    Cancel Reservation
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Manage;
