import {useState,useEffect} from 'react'
import {FaEyeSlash,FaEye} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { InputChange,FormSubmit } from '../../utils/interface';
import { useLoginUserMutation} from '../../redux/api/authApi';
import {toast} from 'react-toastify'
import { useAppDispatch } from '../../redux/hooks';
import { setUser } from '../../redux/state/authSlice';
import LoginLoader from '../global/LoginLoder';


 const LoginPassword = () => {
    
    const [loginUser,{data,isSuccess,isError,isLoading,error}]=useLoginUserMutation()  //extract Login user from authApi

   
    /* ---------------------------- form input state ---------------------------- */
    const initialState={account:'',password:''}
    const [userLogin,setUserLogin]=useState(initialState)
    const {account,password}=userLogin
    const [showPassword, setShowPassword] = useState(false);

    const navigate=useNavigate()
/* --------------------------------import dispatch -------------------------------- */
    const dispatch=useAppDispatch()

  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
/* ------------------------------- handleInput ------------------------------ */
    const handleInputChange=(e:InputChange)=>{
        const {name,value}=e.target
        setUserLogin({...userLogin,[name]:value})
    }
/* ------------------------------ handle submit ----------------------------- */
    const handleSubmit=async (e:FormSubmit)=>{
        e.preventDefault()
     
        if(account && password){
          await loginUser({...userLogin})       
        }else{
          toast.error('Please fill up all field')
        }        
    }

    
    /* -------------------------------- useeffect and dispatch ------------------------------- */
    useEffect(()=>{
      if(isSuccess){
        toast.success('User successfully Login')
        // dispatch(setUser({account:data.user.account,avatar:data.user.avatar,role:data.user.role,type:data.user.type,username:data.user.username,access_token:data.access_token,id:data.user._id}))
        

            dispatch(setUser({user:data.user,access_token:data.access_token}))

        navigate('/')
      }
      
      if(isError){
        toast.error(`${(error as any).data.msg}`)
      }
    },[isSuccess,isError,data])

  
    return (

          <form onSubmit={handleSubmit}>
            {/* ------------------------------ input account ----------------------------- */}
            <div className="mt-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="text"
                className="w-full border border-gray-300 text-xs p-1 placeholder-gray-400 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                value={account}
                name='account'
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-2">
                {/* ----------------------------- input password ----------------------------- */}
              <label className="block text-sm font-medium">Password</label>
              <div className='flex items-center justify-between gap-1'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className=" w-full border border-gray-300 text-xs p-1 placeholder-gray-400 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  name='password'
                  onChange={handleInputChange}
                />
                {/* -------------------------- password show or not Logic-------------------------- */}
                <span className="ursor-pointer p-1 border border-gray-300 rounded" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEye/> : <FaEyeSlash/>}
                </span>
              </div>
            </div>
            {/* ------------------------- forget_pass & login btn ------------------------ */}
            <div className="flex justify-between items-center mt-2">
              <Link to='/forget_password' className="text-blue-500 text-sm">Forgot Password?</Link>
              <button
                type="submit"
                className="text-sm text-white bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 focus:outline-none"
                
              >
                {
                  isLoading ? <LoginLoader/> : 'Login'
                }
              </button>
            </div>
          </form>

    );
  };

 
 export default LoginPassword