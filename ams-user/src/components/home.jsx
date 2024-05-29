import React from 'react';
import image from "../assets/hero.jpg";
import image1 from "../assets/img1.jpg"
import image2 from "../assets/img2.jpg"
import image3 from "../assets/img3.jpg"
import image4 from "../assets/img4.jpg"
import bg from "../assets/hero.jpg"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFlightsInfo } from '../store/slices/flightsSlice';
import { toast } from 'react-toastify';
import Navbar from './navbar';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dest, setDest] = useState('');
  const [dep, setDep] = useState('');
  const [date, setDate] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const req = {
      "date": date,
       "dep": dep,
       "arr":dest,
    }

    try {
      
      dispatch(setFlightsInfo(req));
      navigate('/flights');
      console.log(req);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="relative h-[90vh] sm:h-[90vh]">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 py-6 sm:py-12 text-white">
        {/* Tagline */}
        <div className="text-center">
          <h1 className="text-2xl md:text-5xl font-extrabold tracking-tight mb-2 sm:mb-4 font-mono">
            Explore the world with Airjet
          </h1>
          <p className="text-base text-sm md:text-md font-thin font-mono">
            Discover our wide range of destinations and plan your next adventure today.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mt-4 sm:mt-8 w-full sm:w-[50%]">
          <h2 className="text-xl sm:text-2xl font-semibold text-black mb-2 sm:mb-4">Find Your Flight</h2>
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
  <label className="block text-black text-sm font-medium mb-1 sm:mb-2">From</label>
  <select
    value={dep}
    onChange={(e) => setDep(e.target.value)}
    className="w-full p-2 rounded-lg bg-transparent border border-black text-black focus:outline-none"
  >
    {/* Option values will be populated dynamically */}
    <option value="">Select Departure City</option>
    <option value="Karachi">Karachi</option>
    <option value="Lahore">Lahore</option>
    <option value="Islamabad">Islamabad</option>
    <option value="Quetta">Quetta</option>
    <option value="Multan">Multan</option>
    {/* Add more options as needed */}
  </select>
</div>

<div>
  <label className="block text-black text-sm font-medium mb-1 sm:mb-2">To</label>
  <select
    value={dest}
    onChange={(e) => setDest(e.target.value)}
    className="w-full p-2 rounded-lg bg-transparent border border-black text-black focus:outline-none"
  >
    {/* Option values will be populated dynamically */}
    <option value="">Select Departure City</option>
    <option value="Karachi">Karachi</option>
    <option value="Lahore">Lahore</option>
    <option value="Islamabad">Islamabad</option>
    <option value="Quetta">Quetta</option>
    <option value="Multan">Multan</option>
    {/* Add more options as needed */}
  </select>
</div>

            </div>
            <div className="mt-2 sm:mt-4">
              <label className="block text-black text-sm font-medium mb-1 sm:mb-2">
                Departure Date
              </label>
              <input
                type="date"
                className="w-full p-2 rounded-lg bg-transparent border border-black text-black focus:outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="mt-4 sm:mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300"
            >
              Search Flights
            </button>
          </form>
        </div>
      </div>
    </div>
    <div>
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-6 font-mono">
          Why Airjet
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Who We Are */}
          <div className="text-center">
            <img src={image1} alt="Who We Are" className="w-32 h-32 mx-auto rounded-full opacity-80" />
            <h3 className="text-xl font-semibold mt-4">Who We Are</h3>
            <p className="text-gray-600 mt-2">
              Learn about our history and values.
            </p>
          </div>

          {/* Our Home */}
          <div className="text-center">
            <img src={image2} alt="Our Home" className="w-32 h-32 mx-auto rounded-full opacity-80" />
            <h3 className="text-xl font-semibold mt-4">Our Home</h3>
            <p className="text-gray-600 mt-2">
              Explore our destinations and facilities.
            </p>
          </div>

          {/* True Value */}
          <div className="text-center">
            <img src={image3} alt="True Value" className="w-32 h-32 mx-auto rounded-full opacity-80" />
            <h3 className="text-xl font-semibold mt-4">True Value</h3>
            <p className="text-gray-600 mt-2">
              Discover our competitive pricing and offers.
            </p>
          </div>

          {/* Comfort */}
          <div className="text-center">
            <img src={image4} alt="Comfort" className="w-32 h-32 mx-auto rounded-full opacity-80" />
            <h3 className="text-xl font-semibold mt-4">Comfort</h3>
            <p className="text-gray-600 mt-2">
              Experience a comfortable journey with us.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section
    className="bg-cover bg-center relative py-16"
    style={{ backgroundImage: `url(${bg})` }}
  >
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="container mx-auto text-white relative z-10 px-4">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold font-mono">
          Subscribe to Our Newsletter
        </h2>
        <p className="mt-4 text-lg">
          Stay updated with our latest offers and news.
        </p>
      </div>
      <div className="max-w-lg mx-auto mt-8">
        <form>
          <div className="flex items-center border-b border-white py-2">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-transparent text-white w-full focus:outline-none"
            />
            <button
              type="submit"
              className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              Subscribe
            </button>
          </div>
        </form>
        <p className="text-xs mt-2">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  </section>
  </div>
    </div>
  );
};

export default Home;
