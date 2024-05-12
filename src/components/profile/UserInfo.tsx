import React, { useRef, useState ,useEffect} from 'react';
import { FormSubmit, InputChange } from '../../utils/interface';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectAuth, setUser } from '../../redux/state/authSlice';
import {BiSolidCameraPlus} from 'react-icons/bi'
import { useUserUpdateMutation } from '../../redux/api/authApi';
import { checkImage,ImageUplode } from '../../utils/imageUpload';
import { toast } from 'react-toastify';
import LoginLoader from '../global/LoginLoder';
import { Link } from 'react-router-dom';



const UserInfo: React.FC = () => {
  const {user,access_token}=useAppSelector(selectAuth)
    const initialState={account:'',username:'',avatar:''}
    const [userProfile,setUserProfile]=useState(initialState)
    const {username,avatar}=userProfile
    const [update,isUpdate]=useState(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null);


    const [userUpdate,{data,isSuccess,isError,error}]=useUserUpdateMutation()

    const dispatch=useAppDispatch()

    

/* --------------------------- handle input change -------------------------- */
  const handleChange = (e:InputChange) => {
    const { name, value } = e.target;
    setUserProfile({...userProfile,[name]:value})
  };


  /* -------------------------- handle update profile ------------------------- */
  const handleUpdateProfile =async (e:FormSubmit) => {
    e.preventDefault();

    isUpdate(true)
  
    if(avatar || username){
      if(checkImage(avatar)){
        toast.error(`${checkImage(avatar)}`)
      }else{
       await userUpdate({avatar:(await ImageUplode(avatar)).url,username:username ? username : user?.username as string,account:user?.account as string})
      }
    }else{
      toast.error(`Please select any field to update`)
        isUpdate(false)
    }
  };

 
 
  /* -------------------------- handle profile click -------------------------- */
  const handleProfilePicClick = () => {
     if (fileInputRef.current) {
      fileInputRef.current.click();
  }

};

   /* ------------------- handle changing the profile picture ------------------ */
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setUserProfile({...userProfile,avatar:file})
    }
   
  };


     /* -------------------------------- useeffect and dispatch ------------------------------- */
     useEffect(()=>{
      if(isSuccess){
        
        const avatarUrl=ImageUplode(avatar)
        avatarUrl
          .then((result) => {
            
            dispatch(setUser({user:{...user,avatar:result.url ? result.url : user?.avatar,username:username ? username : user?.username,account:user?.account as string},access_token:access_token}))

            toast.success(`${data.msg}`)
            setUserProfile(initialState)

            isUpdate(false)


          })
          .catch((error) => {
            console.error("Error:", error);
          });

      }
      
      if(isError){
        toast.error(`${(error as any).data.msg}`)
      }
    },[isSuccess,isError,data])


  return (
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Profile Picture
            </label>

            <div>
                <img
                  onClick={handleProfilePicClick}
                  src={avatar ? URL.createObjectURL(avatar as any) :  (user?.avatar || undefined)}
                  alt="Profile"
                  className="w-32 h-32 cursor-pointer object-cover rounded-full mx-auto"
                />
                <button className="w-full text-2xl text-black px-4 py-2 rounded  focus:outline-none">
                    {
                      user?.username
                    }
                </button>
                <div onClick={handleProfilePicClick} className="mt-1 cursor-pointer border border-gray-300 flex items-center justify-center rounded-full mx-auto text-2xl">
                  <BiSolidCameraPlus/>
                </div>     
            </div>

            <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
                ref={fileInputRef}
              />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Usernmae</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your new Username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="text"
              name="account"
              defaultValue={`${user?.account}`}
              disabled={true} 
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email/phone-number"
            />
          </div>

          

          <div className="flex justify-between items-center mb-4">
                {
                    user?.type !== 'google' && (
                      <Link to='/update_password' className="text-blue-500 text-sm">Update Password</Link>
                    )
                   
                }
              
              <button
                  type="submit"
                  className="text-sm text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                  
                  {
                    update ? <LoginLoader/> : 'Update Profile'
                  }
                  
                </button>
            </div>
        </form>

  );
};

export default UserInfo;
