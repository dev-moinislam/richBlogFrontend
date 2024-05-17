import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLoginMutation } from '../../redux/api/authApi';
import {toast} from 'react-toastify'
import LoginLoader from '../global/LoginLoder';
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { setUser } from '../../redux/state/authSlice';






const SocialLogin = () => {

    const navigate=useNavigate()
/* --------------------------------import dispatch -------------------------------- */
    const dispatch=useAppDispatch()
    const [googleLogin,{data,isLoading,isError,isSuccess,error}]=useGoogleLoginMutation()
  console.log(error)

console.log(data)

useEffect(()=>{
  if(isSuccess){
    toast.success(`${data.msg}`)
    // dispatch(setUser({account:data.user.account,avatar:data.user.avatar,role:data.user.role,type:data.user.type,username:data.user.username,access_token:data.access_token,id:data.user._id}))
    dispatch(setUser({user:data.user,access_token:data.access_token}))
    navigate('/')
  }
  
  if(isError){
    toast.error(`${(error as any).data.msg}`)
  }
},[isSuccess,isError])

  
	return (
		<div className="flex justify-center -z-40">	

    {
      !isLoading ? (
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
              const {credential}=credentialResponse 
                if(credential){
                  await googleLogin({credential})
                }

              }}
              onError={() => {
                console.log('Login Failed');
              }}
              
              type =	'icon'

            />
      ):<LoginLoader/>
    }
	
        

		</div>

	);
}

export default SocialLogin