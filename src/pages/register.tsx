import { useEffect, useState } from 'react';
import { FormSubmit, InputChange } from '../utils/interface';
import { Link } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/api/authApi';
import {toast} from 'react-toastify'
import LoginLoader from '../components/global/LoginLoder';
import SocialLogin from '../components/auth/SocialLogin';

const Registration = () => {
    const initialState={username:'',account:'',password:'',cf_password:''}
    const [userRegistration,setUserRegistration]=useState(initialState)
    const {username,account,password,cf_password}=userRegistration

    /* -------------------- registerUser extract for dispatch ------------------- */
    const [registerUser,{isLoading,isError,isSuccess,error}]=useRegisterUserMutation()
   
   
   /* --------------------------- handle input change -------------------------- */
    const handleChange = (e:InputChange) => {
    const { name, value } = e.target;
    setUserRegistration({...userRegistration,[name]:value})
  };

/* ------------------------------ Handle submit ----------------------------- */
  const handleSubmit =async (e:FormSubmit) => {
    e.preventDefault();
  
    if(username && account && password && cf_password){
      if(password !== cf_password){
        toast.error('password does not match')
        
        
      }else{
        await registerUser({username,account,password})

      }    
    }else{
      toast.error('Fill up all field')
    }

  };

  /* ----------------- useEffect for handle error and success ----------------- */
  useEffect(()=>{
    if(isSuccess){
      toast.success('Check you email to verify your account')
      setUserRegistration(initialState)
    } 
    
    if(isError){
      toast.error(`${(error as any).data.msg}`)
    }
    

  },[isSuccess,isError])

  return (
    <div className="flex justify-center items-center h-[90%] py-10 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 sm:w-96  ">
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            {
              isLoading ? <LoginLoader/> : "Register"
            }
          </button>
        </form>

        <div className="mt-4 text-center  border-t border-gray-300 pt-4">
          <SocialLogin/>
        </div>

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
