import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectionInfo } from '../store/slices/selectionSlice';
import Navbar from './navbar';
  
const FlightOptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { flightsInfo } = useSelector((state) => state.flights);
  const {date, dep, arr} = flightsInfo;
  const req = {
    "dep_date": date,
    "dep_city": dep,
    "arr_city": arr
  }

  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:5000/api/flights/search-flights', req)
      .then((response) => {
        setFlights(response.data.flights); // change this line
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [flightsInfo]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };


  const handleFlightSelect = (flightId) => {
    const req = {
      "flightid": flightId,
    }

    try {
      dispatch(setSelectionInfo(req));
      navigate('/reservation');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  
  return (
    <div>
      <Navbar/>
    
    <div className="relative bg-white">
      {/* Content */}
      <div className="px-4 py-6 sm:py-12">
        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 font-mono text-black">
            Select Your Flight
          </h1>
        </div>

        <div className="max-w-2xl mx-auto">
  {flights.map((flight, index) => (
    
    <div
      key={index}
      className="bg-gray-100 p-10 rounded-lg shadow-md mb-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-black pb-3">{flight.deptime} - {flight.arrtime} - {formatDate(flight.flight_date)}</h2>
          <p className="text-gray-700 pb-3 text-lg">{flight.aircraftid} | {flight.flight_duration} hours</p>
          <p className="text-gray-700 text-lg">{flight.dep} to {flight.arr}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-800 pb-3 text-2xl">PKR {flight.flight_price}</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-2 transition duration-300 text-lg px-8" onClick={() => handleFlightSelect(flight.flightid)}>
            Select
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

export default FlightOptions;
