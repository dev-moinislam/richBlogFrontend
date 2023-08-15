import { useState,useEffect } from "react";
import { FormSubmit, InputChange } from "../utils/interface";
import { useVerifyUserForForgetPassMutation } from "../redux/api/authApi";
import { toast } from "react-toastify";
import LoginLoader from "../components/global/LoginLoder";

const ForgotPassword = () => {
     /* ---------------------------- form input state ---------------------------- */
     const initialState={account:''}
     const [userAccount,setUserAccount]=useState(initialState)
     const {account}=userAccount


    const [verifyUserForForgetPass,{data,isSuccess,isError,isLoading,error}]=useVerifyUserForForgetPassMutation()  //extract email from authApi
     console.log(data)

     const handleAccountChange=(e:InputChange)=>{
        const {name,value}=e.target
        setUserAccount({...userAccount,[name]:value})
     }

     const handleSubmit=async (e:FormSubmit)=>{
        e.preventDefault()
        if(account){
            await verifyUserForForgetPass({account})       
          }else{
            toast.error('Please fill up this field')
          }
     }

      /* ----------------- useEffect for handle error and success ----------------- */
  useEffect(()=>{
    if(isSuccess){
      toast.success(`${data.msg}`)
      setUserAccount(initialState)
    } 
    
    if(isError){
      toast.error(`${(error as any).data.msg}`)
    }
    

  },[isSuccess,isError])


    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-80">
          <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
          
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email or Phone Number</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your email or phone"
                value={account}
                name='account'
                onChange={handleAccountChange}
              />
            </div>
            <button
              type="submit"
              className="w-full text-sm text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            >
              {
                isLoading ? <LoginLoader/> : 'Send Mail'
              }
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default ForgotPassword;
  