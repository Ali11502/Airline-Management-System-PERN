import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t-2 font-mono">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h4 className="text-xl font-semibold mb-4">About Us</h4>
            <ul className="space-y-2">
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Awards</a></li>
              <li><a href="#">Media Center</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2">
              <li><a href="#">All Destinations</a></li>
              <li><a href="#">Route Map</a></li>
              <li><a href="#">Special Offers</a></li>
            </ul>
          </div>

          {/* Travel Information */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Travel Information</h4>
            <ul className="space-y-2">
              <li><a href="#">Baggage Information</a></li>
              <li><a href="#">Check-in</a></li>
              <li><a href="#">In-Flight Services</a></li>
              <li><a href="#">Travel Policies</a></li>
            </ul>
          </div>

          {/* Connect with Us */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Connect with Us</h4>
            <div className="flex space-x-4">
              <a href="#">
                <FaFacebook className="text-emirates-blue text-2xl hover:text-emirates-gold" />
              </a>
              <a href="#">
                <FaTwitter className="text-emirates-blue text-2xl hover:text-emirates-gold" />
              </a>
              <a href="#">
                <FaInstagram className="text-emirates-blue text-2xl hover:text-emirates-gold" />
              </a>
              <a href="#">
                <FaLinkedin className="text-emirates-blue text-2xl hover:text-emirates-gold" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Your Airline. All rights reserved.</p>
          <p>Website by Your Company</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
