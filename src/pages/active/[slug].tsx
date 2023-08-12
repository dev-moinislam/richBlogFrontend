import { useParams } from "react-router-dom";
import { useVerifyUserMutation } from "../../redux/api/authApi";
import { FormSubmit, IParams } from "../../utils/interface";
import { useEffect } from "react";
import {toast} from 'react-toastify'
import LoginLoader from "../../components/global/LoginLoder";

const ActivationPage = () => {
    const {slug}:IParams=useParams()
    const [verifyUser,{data,isLoading,isSuccess,isError,error}]=useVerifyUserMutation()

    /* ------------------------- handle account activate ------------------------ */
    const handleSubmit =async (e:FormSubmit) => {
        e.preventDefault();
      
        if(slug){
            await verifyUser({active_token:slug})
        }
    };

/* ------------------------- Hadle error and success ------------------------ */
      useEffect(()=>{
        if(isSuccess){
          toast.success('Your Account is Activated')
        } 
        
        if(isError){
          toast.error(`${(error as any).data.msg}`)
        }
      },[isSuccess,isError])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
       {
        !isSuccess ? (
            <>
                <h1 className="text-2xl font-semibold mb-4 text-center">Activate Your Email</h1>
                <p className="mb-4">Click the button below to activate your email.</p>
                <form onSubmit={handleSubmit}>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                    {
                    isLoading ? <LoginLoader/> : "Activate your Account"
                    }
                </button>
                </form>
            </>
        ) : (
            <>
                <h1 className="text-2xl font-semibold mb-4 text-center">Account is Activated</h1>
            </>
        )
       }
      </div>
    </div>
  );
};
export default ActivationPage