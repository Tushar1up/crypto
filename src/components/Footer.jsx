import React from 'react';

const Footer = () => {
  return (
    <footer className="  py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Start your adventure today</h1>
          <p className="text-gray-400">Register now to explore the possibilities of cryptocurrency finance for your future</p>
        </div>
        <div className="flex justify-around">
          <div>
            <h2 className="text-xl font-semibold mb-2">Company</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Announcements</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Trade</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Spot</a></li>
              <li><a href="#" className="hover:underline">Perpetual</a></li>
              <li><a href="#" className="hover:underline">Future</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Services</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Tracking Bots</a></li>
              <li><a href="#" className="hover:underline">API</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;