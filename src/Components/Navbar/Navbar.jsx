import React, { useContext, useState } from 'react';
import {NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let { userToken, setUserToken } = useContext(AuthContext);

  const navigate = useNavigate()

  function signOut() {
    setUserToken('')
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="bg-green-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-extrabold text-2xl">
          <i class="fa-solid fa-cart-shopping p-1"></i>
          Fresh Cart
        </div>
        {userToken &&
          <div className="hidden md:flex space-x-3 lg:space-x-5">
            <NavLink to={'/'} className="text-white hover:text-green-200 text-lg">Home</NavLink>
            <NavLink to={'/products'} className="text-white hover:text-green-200 text-lg">Products</NavLink>
            <NavLink to={'/categories'} className="text-white hover:text-green-200 text-lg">Categories</NavLink>
            <NavLink to={'/brands'} className="text-white hover:text-green-200 text-lg">Brands</NavLink>
            <NavLink to={'/cart'} className="text-white hover:text-green-200 text-lg">Cart</NavLink>
            <NavLink to={'/wishlist'} className="text-white hover:text-green-200 text-lg">Wishlist</NavLink>
          </div>
        }
        <div className='flex gap-4'>
          {!userToken && <>
            <Link to={'/register'} className="bg-white text-green-600 font-semibold py-2 px-4 rounded hover:bg-gray-200 hidden md:block">
              Register
            </Link>
            <Link to={'/login'} className="bg-white text-green-600 font-semibold py-2 px-4 rounded hover:bg-gray-200 hidden md:block">
              Login
            </Link>
          </>}

          {userToken && <button onClick={signOut} className="bg-white text-green-600 font-semibold py-2 px-4 rounded hover:bg-gray-200 hidden md:block">
            Logout
          </button>}
        </div>

        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {userToken && isMenuOpen && (
        <div className="md:hidden bg-green-700 p-4 mt-2 rounded">
          <ul className="flex flex-col space-y-4">
            <li><NavLink to={'/'} className="text-white hover:text-green-200 text-lg">Home</NavLink></li>
            <li><NavLink to={'/products'} className="text-white hover:text-green-200 text-lg">Products</NavLink></li>
            <li><NavLink to={'/categories'} className="text-white hover:text-green-200 text-lg">Categories</NavLink></li>
            <li><NavLink to={'/brands'} className="text-white hover:text-green-200 text-lg">Brands</NavLink></li>
            <li><NavLink to={'/cart'} className="text-white hover:text-green-200 text-lg">Cart</NavLink></li>
            <li><NavLink to={'/wishlist'} className="text-white hover:text-green-200 text-lg">Wishlist</NavLink></li>
            <li><button  onClick={signOut} className="text-white hover:text-green-200 text-lg">Logout</button></li>
            <li><NavLink to={'/login'} className="text-white hover:text-green-200 text-lg">login</NavLink></li>
          </ul>
        </div>

      )}
    </nav>
  );
}
