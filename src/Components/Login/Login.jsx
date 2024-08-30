import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  let { setUserToken } = useContext(AuthContext)
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('Password is required')
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  async function onSubmit() {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
      setIsLoading(false);
      setUserToken(data.token);
      localStorage.setItem('token', data.token)
      if (location.pathname == "/login") {
        navigate('/')
      }
      else {
        navigate(location.pathname);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMsg(err.response.data.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor='email' className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              name='email'
              id='email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? <div className="text-red-500 text-sm">{errors.email}</div> : null}
          </div>
          <div className="mb-4">
            <label htmlFor='password' className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              name='password'
              id='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password ? <div className="text-red-500 text-sm">{errors.password}</div> : null}
          </div>
          <div className="text-right mb-4">
            <Link to="/forgot-password" className="text-green-500 hover:underline">
              Forgot your password?
            </Link>
          </div>
          {errorMsg && <div className="text-red-500 mb-4 text-center">{errorMsg}</div>}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-500"
            disabled={isLoading || !values.email || !values.password || Object.keys(errors).length > 0}
            >
            Login
            {isLoading && <i className='fas fa-spinner fa-spin ml-2'></i>}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Don't have an account?
            <Link to="/register"  className="text-green-500 hover:underline ml-1">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
