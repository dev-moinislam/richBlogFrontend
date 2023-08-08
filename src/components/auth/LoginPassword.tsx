import {useState} from 'react'
import {FaEyeSlash,FaEye} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { InputChange,FormSubmit } from '../../utils/interface';

 const LoginPassword = () => {
    const initialState={account:'',password:''}
    const [userLogin,setUserLogin]=useState(initialState)
    const {account,password}=userLogin
    
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleInputChange=(e:InputChange)=>{
        const {name,value}=e.target
        setUserLogin({...userLogin,[name]:value})
    }

    const handleSubmit=(e:FormSubmit)=>{
        e.preventDefault()
    }
  
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-80 sm:w-96 ">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
            {/* --------------------------- other signin option -------------------------- */}
            <div className="border-t border-gray-300 pt-4 text-center">
              <p className="text-sm">Or sign in with</p>
              <div className="mt-2">
                <button
                  type="button"
                  className="inline-block mx-1 text-blue-500 hover:text-blue-600"
                >
                  Password
                </button>
                <span> | </span>
                <button
                  type="button"
                  className="inline-block mx-1 text-blue-500 hover:text-blue-600"
                >
                  SMS
                </button>
              </div>
            </div>
            {/* ------------------------- navigate register page ------------------------- */}
            <div className="mt-4">
              <p className="text-sm">
                Don't have an account?{' '}
                <Link to='/register' className="text-blue-500">Register here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  };

 
 export default LoginPassword