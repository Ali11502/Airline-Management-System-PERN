import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AdminNav from './adminNav';

const AdminFlightPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { paymentInfo } = useSelector((state) => state.payment);
  const { flightid } = paymentInfo;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/payments/byFlight/${flightid}`);
        setPayments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, [flightid]);

  return (
    <div>
      <AdminNav />
      <div className="container mx-auto mt-8 mb-8">
        <div className="text-center">
          <h1 className="text-2xl md:text-5xl font-extrabold tracking-tight py-[6vh] mb-2 sm:mb-4 font-mono">
          Payments for Flight {flightid}
          </h1>
        </div>
        {loading ? (
          <p>Loading payments...</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">Payment ID</th>
                <th className="p-3 border">Reservation ID</th>
                <th className="p-3 border">User ID</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Time</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.paymentid} className="bg-gray-100">
                  <td className="p-3 border">{payment.paymentid}</td>
                  <td className="p-3 border">{payment.reservationid}</td>
                  <td className="p-3 border">{payment.id}</td>
                  <td className="p-3 border">{payment.status}</td>
                  <td className="p-3 border">{payment.amount}</td>
                  <td className="p-3 border">{payment.date}</td>
                  <td className="p-3 border">{payment.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminFlightPayments;
