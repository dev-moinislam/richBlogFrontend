import LoginPassword from "../components/auth/LoginPassword"
import { Link } from 'react-router-dom';
import SocialLogin from "../components/auth/SocialLogin";



const login = () => {

  return (
    <>
    <div className="flex justify-center items-center h-screen bg-gray-100 px-3 mt-10">
        <div className="bg-white p-8 rounded shadow-md w-96 sm:w-96 ">
          <h2 className="text-xl font-semibold">
            Login with Password
          </h2>

          <LoginPassword/> 

            {/* --------------------------- other signin option -------------------------- */}
            <div className="mt-2 text-center  border-t border-gray-300 pt-2">
               <SocialLogin/>
            </div>
            {/* ------------------------- navigate register page ------------------------- */}
            <div className="mt-4">
              <p className="text-sm">
                Don't have an account?{' '}
                <Link to='/register' className="text-blue-500">Register here</Link>
              </p>
            </div>
        </div>
      </div>
    
    </>
  )
}

export default login
