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

  /* ------------------------------ set User name state ----------------------------- */
  // {username,avatar,account,type,role}
  const {username,avatar}=useAppSelector(selectAuth)



  
  useEffect(()=>{
      dispatch(setUser({...userInfo}))
  },[])


  return (
    <div className="w-full sticky bg-blue-500 shadow-md">
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
            !username && (
              BfLogRegLink.map((item,index)=>(
                <Link key={index} to={item.path} className="text-white hover:text-blue-300 px-4 py-2 rounded-md">
                  {item.label}
                </Link>
              ))
            )
          }

          {/* -------------------------------- Dropdown start-------------------------------- */}
            {
              username && (
                <div className="relative inline-block">
                  <button
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    {
                      avatar ? (
                        <img className='md:w-7 md:h-7 sm:w-5 sm:h-5 rounded-full' src={avatar} alt="" />

                      ) : username 
                    }
                  </button>

              {isOpen && (
                <div className="absolute top-15 right-0 mt-2 bg-white shadow-lg w-[200]">
                  <Link to='/profile' onClick={toggleDropdown} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
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
          <div className="fixed top-0 right-0 w-[50%] h-screen bg-blue-500 opacity-90 z-[-10]">
            <div className="flex flex-col justify-center items-center h-full space-y-8">
              {/* Add sidebar links here */}
              {/* -------------------------------- menu Item ------------------------------- */}
              {
                !username && (
                  BfLogRegLink.map((item,index)=>(
                    <Link onClick={toggleMenu} key={index} to={item.path} className="text-white hover:text-blue-300 px-4 py-2 rounded-md">
                      {item.label}
                    </Link>
                  ))
                )
              }

              {/* ------------------------------ dropdown item small device start----------------------------- */}
                {
                  username && (
                    <div className="relative flex justify-center items-center h-screen flex-col">
                    <button
                      className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                      onClick={toggleDropdown}
                    >
                      {
                        avatar && (
                          <img className='w-10 h-10 rounded-full' src={avatar} alt="" />

                        ) 
                      }
                    </button>

                      <div className=" top-15  mt-0 bg-white shadow-lg w-[200]">
                        <p className=" px-2 py-1 text-gray-800 hover:bg-gray-200">{username}</p>
                      </div>

                    {isOpen && (
                      <div className="absolute bottom-[27%] bg-white shadow-lg w-[200]">
                        <Link to='/profile' onClick={toggleMenu} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                        <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                      </div>
                    )}
                  </div>
                )
                }
              {/* ------------------------------ dropdown item small device end----------------------------- */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
