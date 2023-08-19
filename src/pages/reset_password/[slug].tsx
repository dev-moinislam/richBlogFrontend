import { useEffect, useState } from 'react';
import {toast} from 'react-toastify'
import { useUpdatePasswordMutation } from '../../redux/api/authApi';
import LoginLoader from '../../components/global/LoginLoder';
import { FormSubmit, IParams, InputChange } from '../../utils/interface';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const initialState={password:'',cf_password:''}
    const [resetPassword,setResetPassword]=useState(initialState)
    const {password,cf_password}=resetPassword

    const navigate=useNavigate()
    

    const {slug}:IParams=useParams()


    /* -------------------- updatePassword extract for dispatch ------------------- */
    const [updatePassword,{isLoading,isError,isSuccess,error}]=useUpdatePasswordMutation()
   
   /* --------------------------- handle input change -------------------------- */
    const handleChange = (e:InputChange) => {
    const { name, value } = e.target;
    setResetPassword({...resetPassword,[name]:value})
  };

/* ------------------------------ Handle submit ----------------------------- */
  const handleSubmit =async (e:FormSubmit) => {
    e.preventDefault();
  
    if(password && cf_password){
      if(password !== cf_password){
        toast.error('password does not match')       
      }
      if(slug && (password === cf_password)){
        await updatePassword({access_token:slug,password:password})
      }

          
    }else{
      toast.error('Fill up all field')
    }

  };

  /* ----------------- useEffect for handle error and success ----------------- */
  useEffect(()=>{
    if(isSuccess){
      toast.success('Your password is changed')
      setResetPassword(initialState)
      navigate('/login')
    } 
    
    if(isError){
      toast.error(`${(error as any).data.msg}`)
    }
    

  },[isSuccess,isError])


    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-80">
          <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
          
          <form onSubmit={handleSubmit}>
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
              className="w-full text-sm text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            >
              {
                isLoading ? <LoginLoader/> : 'Reset Password'
              }
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default ResetPassword;
  