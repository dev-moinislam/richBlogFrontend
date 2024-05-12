import { useEffect, useState } from 'react';
import { FormSubmit, InputChange } from '../utils/interface';
import { Link } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/api/authApi';
import {toast} from 'react-toastify'
import LoginLoader from '../components/global/LoginLoder';
import SocialLogin from '../components/auth/SocialLogin';
import {FaEyeSlash,FaEye} from 'react-icons/fa'

const Registration = () => {
    const initialState={username:'',account:'',password:'',cf_password:''}
    const [userRegistration,setUserRegistration]=useState(initialState)
    const {username,account,password,cf_password}=userRegistration
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    /* -------------------- registerUser extract for dispatch ------------------- */
    const [registerUser,{isLoading,isError,isSuccess,error}]=useRegisterUserMutation()
   
   
   /* --------------------------- handle input change -------------------------- */
    const handleChange = (e:InputChange) => {
    const { name, value } = e.target;
    setUserRegistration({...userRegistration,[name]:value})
  };

    /* --------------------------- Password Visibility Function-------------------------- */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowCPassword(!showCPassword);
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
    <div className="flex justify-center items-center h-screen mt-10 bg-gray-100 px-3">
      <div className="bg-white px-8 py-5 rounded shadow-md w-96 sm:w-96 ">
        <h2 className="text-xl font-semibold">Register an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              className="w-full border border-gray-300  rounded focus:outline-none focus:border-blue-500 text-xs p-1 placeholder-gray-400"
              placeholder="Enter your username"
            />
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="text"
              name="account"
              value={account}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-xs p-1 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium">Password</label>
            
            <div className='flex items-center h-auto justify-between gap-1'>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-xs p-1 placeholder-gray-400"
              placeholder="Enter your password"
            />
            <span className="cursor-pointer p-1 border border-gray-300 rounded" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye/> : <FaEyeSlash/>}
            </span>
            </div>
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium">Confirm Password</label>
            <div className='flex items-center justify-between gap-1'>
            <input
              type={showCPassword ? 'text' : 'password'}
              name="cf_password"
              value={cf_password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-xs p-1 placeholder-gray-400"
              placeholder="Re-enter your password"
            />
            <span className="cursor-pointer p-1 border border-gray-300 rounded" onClick={togglePasswordVisibility2}>
                  {showCPassword ? <FaEye/> : <FaEyeSlash/>}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none mt-3 text-sm py-2"
          >
            {
              isLoading ? <LoginLoader/> : "Register"
            }
          </button>
        </form>

        <div className="mt-2 text-center  border-t border-gray-300 pt-2">
          <SocialLogin/>
        </div>

        <div className=" text-center">
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
