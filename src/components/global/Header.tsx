import  { useState,useEffect } from 'react';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import {  useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logOut, selectAuth, setUser } from '../../redux/state/authSlice';
import { toast } from 'react-toastify';


const Header = () => {
  const BfLogRegLink=[
    {label:'Login',path:'/login'},
    {label:'Register',path:'/register'},
  ]

  const afLoginLinks = [
    { label: 'Home', path: '/' },
    { label: 'CreateBlog', path: '/create_blog' }
  ]

   /* ------------------------------ set User name state ----------------------------- */
  
  const {access_token,user}=useAppSelector(selectAuth)


  const navLinks = access_token ? afLoginLinks : BfLogRegLink



  /* --------------------------- This handle sidebar -------------------------- */
  const [isMenuOpen, setMenuOpen] = useState(false);

    /* --------------------------- import use navigate -------------------------- */
  const navigate=useNavigate()
  const dispatch=useAppDispatch()


  const userInfo=JSON.parse(localStorage.getItem("userInfo") || '{}')

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  /* -------------------------- this handle dropdown -------------------------- */
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout=()=>{
    setIsOpen(!isOpen);
    setMenuOpen(!isMenuOpen);
    dispatch(logOut())
    toast.success("Successfully Logout")
    navigate('/login')

  }



  
  useEffect(()=>{
      dispatch(setUser({...userInfo}))
  },[])


  return (
    <div className="w-full bg-blue-500 shadow-md fixed top-0 left-0 right-0">
      <div className="flex justify-between items-center px-4 py-3 md:px-8 transition">
        <Link to='/' className="text-white text-lg md:text-3xl sm:text-xl font-semibold font-logo">Rich Blog</Link>
        <div className="">
          <Search/>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <RiCloseLine className="h-6 w-6 text-white z-20" />
            ) : (
              <RiMenuLine className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
        <div className="hidden md:flex space-x-4">

          {/* Add navigation items here */}
          {
            
              navLinks.map((item,index)=>(
                <Link key={index} to={item.path}  className="text-white hover:text-blue-300 px-4 py-2 rounded-md">
                  {item.label}
                </Link>
              ))
            
          }

      {/* Adimn role functionality */}
      {
        user?.role === 'admin' && (
        <Link to='/blog_category' className="text-white hover:text-blue-300 px-4 py-2 rounded-md">
          Category
        </Link>)
      }

          {/* -------------------------------- Dropdown start-------------------------------- */}
            {
              access_token && (
                <div className="relative inline-block">
                  <button
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    {
                      user?.avatar ? (
                        <img className='md:w-7 md:h-7 sm:w-5 sm:h-5 rounded-full' src={user.avatar} alt="" />

                      ) : user?.username 
                    }

                  </button>

              {isOpen && (
                <div className="absolute top-15 right-0 mt-2 bg-white shadow-lg w-[200]">
                  <Link to={`/profile/${user?._id}`} onClick={toggleDropdown} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                  <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                </div>
               )}
            </div>
              )
            }
          { /* ----------------------------- Dropdown finish ---------------------------- */}
        </div>
      </div>



 {/* Sidebar */}
 {isMenuOpen && ( 
        <div className="md:hidden">
          <div className="fixed top-0 right-0 w-[50%] h-screen bg-blue-500 -z-10">
            <div className="flex flex-col justify-center items-center h-full space-y-8">
          

              {/* ------------------------------ dropdown item small device start----------------------------- */}
                
                    <div className=" flex justify-center items-center h-screen flex-col">
                    <button
                      className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                      onClick={toggleDropdown}
                    >
                      {
                        user?.avatar && (
                          <img className='w-10 h-10 rounded-full' src={user.avatar} alt="" />

                        ) 
                      }
                        </button>
  
                    {
                      access_token && (
                        <>
                            <div className=" top-15  mt-0 bg-white shadow-lg w-[200]">
                              <p className=" px-2 py-1 text-gray-800 hover:bg-gray-200">{user?.username}</p>
                            </div>

                            <div className=" mt-5 bg-white shadow-lg w-[200]">
                              <Link to={`/profile/${user?._id}`} onClick={toggleMenu} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                              <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                            </div>
                        </>
                      )
                    }
  
                  {/* Add sidebar links here */}
                    {/* -------------------------------- menu Item ------------------------------- */}

                  {
                    
                    navLinks.map((item,index)=>(
                      <Link onClick={toggleMenu} key={index} to={item.path} className="text-white hover:text-blue-300 px-4 py-2 rounded-md">
                        {item.label}
                      </Link>
                    ))
                
                  }
                  {/* Adimn role functionality */}
                  {
                    user?.role === 'admin' && (
                    <Link onClick={toggleMenu} to='/blog_category' className="text-white hover:text-blue-300 px-4 py-2 rounded-md">
                      Category
                    </Link>)
                  }
              
                  </div>
              {/* ------------------------------ dropdown item small device end----------------------------- */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
