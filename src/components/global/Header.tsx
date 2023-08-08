import  { useState } from 'react';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Search from './Search';

const Header = () => {
  const BfLogRegLink=[
    {label:'Login',path:'/login'},
    {label:'Register',path:'/register'},
  ]

  /* --------------------------- This handle sidebar -------------------------- */
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  /* -------------------------- this handle dropdown -------------------------- */
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full sticky bg-blue-500 shadow-md">
      <div className="flex justify-between items-center px-4 py-3 md:px-8 transition">
        <Link to='/' className="text-white text-lg md:text-3xl sm:text-xl font-semibold font-logo">Rich Blog</Link>
        <Search/>
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
            BfLogRegLink.map((item,index)=>(
              <Link key={index} to={item.path} className="text-white hover:text-blue-300 px-4 py-2 rounded-md">
            {item.label}
          </Link>
            ))
          }

          {/* -------------------------------- Dropdown start-------------------------------- */}
            <div className="relative inline-block">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                onClick={toggleDropdown}
              >
                Username
              </button>

              {isOpen && (
                <div className="absolute top-10 right-3 mt-2 bg-white shadow-lg w-[200]">
                  <Link to='/profile' onClick={toggleDropdown} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                  <Link to='' onClick={toggleDropdown} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</Link>
                </div>
              )}
            </div>
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
                BfLogRegLink.map((item,index)=>(
                  <Link onClick={toggleMenu} key={index} to={item.path} className="text-white hover:text-blue-300 px-4 py-2 rounded-md">
                    {item.label}
                  </Link>
                ))
              }

              {/* ------------------------------ dropdown item small device start----------------------------- */}
                <div className="relative inline-block">
                  <button
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    Username
                  </button>

                  {isOpen && (
                    <div className="absolute top-10 right-3 mt-2 bg-white shadow-lg w-[200]">
                      <Link to='/profile' onClick={toggleMenu} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                      <Link to='' onClick={toggleMenu} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</Link>
                    </div>
                  )}
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
