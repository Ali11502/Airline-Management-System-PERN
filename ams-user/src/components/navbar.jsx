// Navbar.js
import React, { useState } from 'react';
import { TfiMenu } from "react-icons/tfi";
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../store/slices/usersApiSlice';
import { logout } from '../store/slices/authSlice';
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { userInfo } = useSelector((state) => state.auth);
  const name = userInfo? userInfo.name : "User";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/signin');
    } catch (err) {
      console.error(err);
    }
  };


  return (
      <div className="bg-white border-b-2 z-1000 font-mono">
        <nav className="flex justify-between items-center w-[92%] mx-auto">
          <div>
          <Link to="/">
            <img className="w-16 cursor-pointer" src={logo} alt="Logo" />
          </Link>
          </div>
          <div
            className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 ${
              isMenuOpen ? 'top-[9%]' : '-top-[100%]'
            } md:w-auto w-full flex items-center px-5`}
          >
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
              <li>
                <Link to="/">
                <a className="hover:text-gray-500" href="#">
                  Book
                </a>
                </Link>
              </li>
              <li>
              <Link to="/manage">
                <a className="hover:text-gray-500" href="#">
                  Manage
                </a>
              </Link>
              </li>
              <li>
                <a className="hover:text-gray-500" href="#">
                  Where we fly
                </a>
              </li>
              <li>
                <a className="hover:text-gray-500" href="#">
                  Help
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-6">
          {userInfo ? (
            <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]" onClick={logoutHandler}>
              Sign out
            </button>
          ) : (
            <Link to="/signin">
            <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
              Sign in
            </button>
            </Link>
          )}
          <Link to="/user">
          <div className='flex flex-col items-center text-center'>
  <FaRegUserCircle className="w-7 h-7 text-slate-500"/>
  <p className="text-xs text-slate-500">{name}</p>
</div>
            </Link>

          <TfiMenu
            onClick={toggleMenu}
            name={isMenuOpen ? 'close' : 'menu'}
            className="text-3xl cursor-pointer md:hidden"
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;