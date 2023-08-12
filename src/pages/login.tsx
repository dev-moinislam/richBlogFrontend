import LoginPassword from "../components/auth/LoginPassword"
import {useState} from 'react'
import { Link } from 'react-router-dom';
import LoginSMS from "../components/auth/LoginSMS";


const login = () => {
const [sms,setSms]=useState(true)

  return (
    <>
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96 sm:w-96 ">
          <h2 className="text-2xl font-semibold mb-4">
            Login
            {
              sms ? ' with Password' : ' with SMS code'
            }
          </h2>

          {
            sms ? <LoginPassword/> : <LoginSMS/>
          }
          

            {/* --------------------------- other signin option -------------------------- */}
            <div className="border-t border-gray-300 pt-4 text-center">
              <p className="text-sm">Or sign in with</p>
              <div className="mt-2">
                {
                    sms ? (
                        <button
                        type="button"
                        className="inline-block mx-1 text-blue-500 hover:text-blue-600"
                        onClick={()=>setSms(!sms)}
                        >
                        SMS
                        </button>
                    ) : (
                        <button
                        type="button"
                        className="inline-block mx-1 text-blue-500 hover:text-blue-600"
                        onClick={()=>setSms(!sms)}
                        >
                        PASSWORD
                        </button>
                    )
                }
                              
              </div>
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
