import { toast } from 'react-toastify';
import {  useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/state/authSlice';
import { useState,useEffect } from 'react';
import { useUpdateUserPassMutation } from '../redux/api/authApi';
import { FormSubmit, InputChange } from '../utils/interface';
import { checkPassword } from '../utils/valid';
import LoginLoader from '../components/global/LoginLoder';



const UpdatePass= () => {
    const {user}=useAppSelector(selectAuth)
    const initialState={password:'',cf_password:''}
    const [userPass,setUserPass]=useState(initialState)
    const {password,cf_password}=userPass



    const [updateUserPass,{data,isLoading,isSuccess,isError,error}]=useUpdateUserPassMutation()

    /* --------------------------- handle input change -------------------------- */
  const handleChange = (e:InputChange) => {
    const { name, value } = e.target;
    setUserPass({...userPass,[name]:value})
  };


  /* -------------------------- handle update profile ------------------------- */
  const handleUpdatePass =async (e:FormSubmit) => {
    e.preventDefault();

    if(!password || !cf_password){
      toast.error('To update password fill up both field')
    }
    else if(password && cf_password){
        if(password===cf_password){
            await updateUserPass({account:user?.account as string,password:password})

        }else{
            toast.error(`${checkPassword(password,cf_password)}`)
        }
    
    }


    
  };


     /* -------------------------------- useeffect and dispatch ------------------------------- */
     useEffect(()=>{
      if(isSuccess){
        toast.success('Your password is changed')
        setUserPass(initialState)

      }
      
      if(isError){
        toast.error(`${(error as any).data.msg}`)
      }
    },[isSuccess,isError,data])



  return (
    <div className="flex justify-center items-center h-[90%] py-10 bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-96 sm:w-96 ">
        <form onSubmit={handleUpdatePass}>
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
            isLoading ? <LoginLoader/> :'Update Password'
           }
          </button>
        </form>
     </div>
     </div>

  )
}

export default UpdatePass