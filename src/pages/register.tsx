import { useState } from 'react';
import { FormSubmit, InputChange } from '../utils/interface';
import { Link } from 'react-router-dom';

const Registration = () => {
  const initialState={username:'',account:'',password:'',cf_password:''}
    const [userRegistration,setUserRegistration]=useState(initialState)
    const {username,account,password,cf_password}=userRegistration

  const handleChange = (e:InputChange) => {
    const { name, value } = e.target;
    setUserRegistration({...userRegistration,[name]:value})
  };

  const handleSubmit = (e:FormSubmit) => {
    e.preventDefault();
    // Handle registration logic here, e.g., API calls
    console.log('Form data submitted:', userRegistration);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full w-96 sm:w-96">
        <h2 className="text-2xl font-semibold mb-4">Register an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="text"
              name="account"
              value={account}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email/phone-number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              name="cf_password"
              value={cf_password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Re-enter your password"
            />
          </div>
          <div className="mb-4 text-red-500">
            {
              (password !== cf_password) && (
                'Password not match!'
              )
            }
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
