import {useEffect, useState} from 'react'
import {FaEyeSlash,FaEye} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { InputChange,FormSubmit } from '../../utils/interface';
import { useLoginUserMutation } from '../../utils/fetchData';
import { toast } from 'react-toastify';

 const LoginPassword = () => {
    const initialState={account:'',password:''}
    const [userLogin,setUserLogin]=useState(initialState)
    const {account,password}=userLogin

    const navigate=useNavigate()
    
    const [showPassword, setShowPassword] = useState(false);

    const [loginUser,{data,isSuccess,isError,error}]=useLoginUserMutation()
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleInputChange=(e:InputChange)=>{
        const {name,value}=e.target
        setUserLogin({...userLogin,[name]:value})
    }

    const handleSubmit=async (e:FormSubmit)=>{
        e.preventDefault()

        if(account && password){
          await loginUser({account,password})
        }else{
          toast.error("Please Fill all the Field")
        }
    }


    useEffect(()=>{
      if(isSuccess){
        toast.success("User Successfully Login")
        navigate('/')
      }
    },[isSuccess])
  
    return (

          <form onSubmit={handleSubmit}>
            {/* ------------------------------ input account ----------------------------- */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email or Phone Number</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your email or phone"
                value={account}
                name='account'
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 relative">
                {/* ----------------------------- input password ----------------------------- */}
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className=" w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                name='password'
                onChange={handleInputChange}
              />
              {/* -------------------------- password show or not Logic-------------------------- */}
              <span className="absolute top-12 right-3 transform -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye/> : <FaEyeSlash/>}
              </span>
            </div>
            {/* ------------------------- forget_pass & login btn ------------------------ */}
            <div className="flex justify-between items-center mb-4">
              <Link to='/forget_password' className="text-blue-500 text-sm">Forgot Password?</Link>
              <button
                type="submit"
                className="text-sm text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                disabled={(account && password) ? false : true}
              >
                Login
              </button>
            </div>
          </form>

    );
  };

 
 export default LoginPassword