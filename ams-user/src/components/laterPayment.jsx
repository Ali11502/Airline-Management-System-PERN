import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const Payment = () => {
  
  const navigate = useNavigate();
  
  const [selectedFlight, setSelectedFlight] = useState({});
  const [method, setMethod] = useState('');
  const [name, setName] = useState('');
  const [num, setNum] = useState('');
  
  const { reservationInfo } = useSelector((state) => state.reservation);
  const {reservationid} = reservationInfo;


  const { userInfo } = useSelector((state) => state.auth);
  const {id} = userInfo;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/flights/flightsByReservation/${reservationid}`)
      .then(response => {
        const { data } = response;
        const {flight} = data;
        setSelectedFlight(flight);
        
      })
      .catch(error => {
        console.error('Error fetching flight:', error);
        // Handle errors
      });
  }, [reservationid]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payment data
    const paymentData = {
      "reservationid": reservationid,
      "id": id,
      "pstatus": "Paid",
      "pamount": selectedFlight.price,
      "pdate": new Date().toLocaleDateString(),
      "ptime": new Date().toLocaleTimeString(), 
    }

    try {
      // Send payment data to server
      const response = await axios.post('http://localhost:5000/api/payments/processPayment', paymentData);

      // Handle successful payment response
      toast.success(response.data.message);
      navigate('/'); // Redirect to success page
    } catch (error) {
      // Handle payment error
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="relative h-screen bg-white mb-12">
      {/* Content */}
      <div className="px-4 py-6 sm:py-12">
       {/* Flight Info */}
       <div
      className="bg-gray-100 p-10 rounded-lg shadow-md mb-4 max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-black pb-3">{selectedFlight.deptime} - {selectedFlight.arrtime} - {formatDate(selectedFlight.date)}</h2>
          <p className="text-gray-700 pb-3 text-lg">{selectedFlight.aircraftid} | {selectedFlight.duration} mins</p>
          <p className="text-gray-700 text-lg">{selectedFlight.dep} to {selectedFlight.arr}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-black pb-3 text-lg">{selectedFlight.price}</p>
        </div>
      </div>
    </div>
        {/* Payment Form */}
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-medium mb-1">Payment Method</label>
              <select
                name="paymentMethod"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-400"
                required
              >
                <option value="">Select Payment Method</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                {/* Add more payment options here */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-medium mb-1">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={num}
                onChange={(e) => setNum(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-medium mb-1">Cardholder Name</label>
              <input
                type="text"
                name="cardName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300"
            >
              Submit Payment
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Payment;
