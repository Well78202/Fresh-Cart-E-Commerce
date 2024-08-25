import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  let navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const initialValues = {
    email: '',
  };

  const { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  async function onSubmit() {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values);
      setIsLoading(false);
      setMessage('A password reset link has been sent to your email');
      toast.success('A password reset link has been sent to your email');
      navigate("/resetpassword");
    } catch (err) {
      setIsLoading(false);
      setMessage('An error occurred while trying to send the email. Please try again.');
      toast.error('An error occurred while trying to send the email. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? <div className="text-red-500 text-sm">{errors.email}</div> : null}
          </div>
          {message && <div className={`mb-4 text-center ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>{message}</div>}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-500"
            disabled={isLoading || !values.email || Object.keys(errors).length > 0}
          >
            Send
            {isLoading && <i className='fas fa-spinner fa-spin ml-2'></i>}
          </button>
        </form>
      </div>
    </div>
  );
}
