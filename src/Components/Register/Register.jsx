import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const[isLoading,setIsLoading] = useState(false)
  const[errorMsg,setErrorMsg] = useState('')
  const[successMsg,setSuccessMsg] = useState('')
  const navigate = useNavigate()


  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Name length must be more than 2 ').max(20, 'Name length must be less than 20'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, 'Phone number is not valid')
      .required('Phone number is required'),
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
  };
  const { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: register,
  });


  async function register() {
    setIsLoading(true)
    setErrorMsg("")
    setSuccessMsg("")

    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then(({data}) =>{
      setIsLoading(false)
      console.log(data)
      setSuccessMsg(data.message)
      navigate('/login')
    }).catch((err)=>{
      setIsLoading(false)
      console.log(err)
      setErrorMsg(err.response.data.message)

    })
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor='name' className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
              id='name'
              name='name'
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name ? <div className="text-red-500 text-sm">{errors.name}</div> : null}
          </div>
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
          <div className="mb-4">
            <label htmlFor='rePassword' className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm your password"
              name='rePassword'
              id='rePassword'
              value={values.rePassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.rePassword && errors.rePassword ? <div className="text-red-500 text-sm">{errors.rePassword}</div> : null}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your phone number"
              id='phone'
              name='phone'
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.phone && errors.phone ? <div className="text-red-500 text-sm">{errors.phone}</div> : null}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-500"
            disabled={isLoading || !values.name || !values.email || !values.password || !values.rePassword || !values.phone || Object.keys(errors).length > 0}
            >
            Register
           {isLoading &&  <i className='fas fa-spinner fa-spin'></i>}
          </button>
          {errorMsg && <div className="text-red-500 mb-4 text-center">{errorMsg}</div>}
          {successMsg && <div className="text-green-500 mb-4 text-center">{successMsg}</div>}
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Already have an account? 
            <Link to="/login" className="text-green-500 hover:underline ml-1">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
