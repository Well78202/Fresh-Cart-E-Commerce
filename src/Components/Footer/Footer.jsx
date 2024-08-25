import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="font-bold text-xl mb-4">About Us</h2>
          <p className="text-gray-400">
            Fresh Cart is your go-to online store for fresh produce, dairy, and more. We bring you the best products at affordable prices.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to={'/'} className="text-gray-400 hover:text-white">Home</Link></li>
            <li><Link to={'/products'} className="text-gray-400 hover:text-white">Products</Link></li>
            <li><Link to={'/categories'} className="text-gray-400 hover:text-white">Categories</Link></li>
            <li><Link to={'/brands'} className="text-gray-400 hover:text-white">Brands</Link></li>
            <li><Link to={'/cart'} className="text-gray-400 hover:text-white">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-4">Contact Us</h2>
          <p className="text-gray-400">Email: support@freshcart.com</p>
          <p className="text-gray-400">Phone: +123 456 7890</p>
          <p className="text-gray-400">Address: 123 Fresh St, Market City</p>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-gray-400">&copy; 2024 Fresh Cart. All rights reserved.</p>
      </div>
    </footer>
  );
}
