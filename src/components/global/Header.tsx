import  { useState } from 'react';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Header = () => {
  const LogRegLink=[
    {label:'Login',path:'/login'},
    {label:'Register',path:'/register'},
  ]
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full sticky bg-blue-500 shadow-md">
      <div className="flex justify-between items-center px-4 py-3 md:px-8 transition">
        <div className="text-white text-lg font-semibold">Your Logo</div>
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
            LogRegLink.map((item,index)=>(
              <Link key={index} to={item.path} className="text-white hover:text-blue-300 px-4 py-2 rounded-md">
            {item.label}
          </Link>
            ))
          }
        </div>
      </div>

 {/* Sidebar */}
 {isMenuOpen && (
        <div className="md:hidden">
          <div className="fixed top-0 right-0 w-[50%] h-screen bg-blue-500 opacity-90 z-[-10]">
            <div className="flex flex-col justify-center items-center h-full space-y-8">
              {/* Add sidebar links here */}
              {
                LogRegLink.map((item,index)=>(
                  <Link onClick={toggleMenu} key={index} to={item.path} className="text-white hover:text-blue-300 px-4 py-2 rounded-md">
                    {item.label}
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
