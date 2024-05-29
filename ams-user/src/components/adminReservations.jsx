import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './adminNav';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setpassengerInfo } from '../store/slices/passengerSlice';
import { useSelector } from 'react-redux';


const ReservationTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reservations, setReservations] = useState([]);
  const {adminreservationInfo} = useSelector((state) => state.adminreservation);

  const {flightid} = adminreservationInfo; // Change this to the desired flight ID

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reservations/reservationByFlight/${flightid}`);
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [flightid]);

  const handleReservationCancel = async (reservationid) => {
    try {
      // Use reservationid in the next request
      const cancelResponse = await axios.post('http://localhost:5000/api/reservations/cancel-reservation', { reservationid });
      
      toast.success(cancelResponse.data.message);

    } catch (error) {
      console.error('Error handling reservation cancellation:', error.response ? error.response.data : error.message);
    }
  };

  const handleReservationUpdate = async(passengerid) => {
    const response = await axios.get(`http://localhost:5000/api/passengers/passenger/${passengerid}`);
    dispatch(setpassengerInfo(response.data));
    navigate('/adminUpdatePassenger')
    
  };

  const handleUpdatePassenger = (passengerId) => {
    // Implement the logic to update the passenger information
    console.log(`Update passenger with ID ${passengerId}`);
  };

  return (
    <div>
      <AdminNav />
      <div className="relative min-h-screen bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 text-white">
          <div className="text-center">
            <h1 className="text-2xl md:text-5xl font-extrabold tracking-tight py-[6vh] mb-2 sm:mb-4 font-mono">
              Reservations for Flight {flightid}
            </h1>
          </div>

          <div className="container mx-auto p-4">
            <div className="bg-white text-black p-4 rounded shadow">
              <table className="w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Reservation ID</th>
                    <th className="p-2 border">Passenger ID</th>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Time</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.reservationid} className="bg-gray-100">
                      <td className="p-2 border text-center">{reservation.reservationid}</td>
                      <td className="p-2 border text-center">{reservation.passengerid}</td>
                      <td className="p-2 border text-center">{new Date(reservation.date).toLocaleDateString()}</td>
                      <td className="p-2 border text-center">{reservation.time}</td>
                      <td className="p-2 border text-center">{reservation.status}</td>
                      <td className="p-2 border text-center">
                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded text-center"
                          onClick={() => handleReservationCancel(reservation.reservationid)}>
                          Delete this Reservation
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded ml-2 text-center"
                          onClick={() => handleReservationUpdate(reservation.passengerid)}>
                          View or Update Passenger
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationTable;
