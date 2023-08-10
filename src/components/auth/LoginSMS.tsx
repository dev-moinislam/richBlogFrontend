import {useState} from 'react'
import { FormSubmit } from "../../utils/interface";




const LoginSMS = () => {
    const [phone,setPhone]=useState('')

    const handleSubmit=(e:FormSubmit)=>{
        e.preventDefault()
    }

  return (

        <form onSubmit={handleSubmit}>
            {/* --------------------------- Input Phone Number --------------------------- */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />
          </div>
         { /* ----------------------------- Input sms Code ----------------------------- */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-2">SMS Code</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 pr-10"
              placeholder="Enter SMS code"
            />
            <button className="absolute top-[50px] right-3 transform -translate-y-1/2 px-2 py-1 text-sm bg-blue-500 text-white rounded focus:outline-none">
              Send
            </button>
          </div>
         { /* ------------------------------ login Button ------------------------------ */}
          <button
            type="button"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
  );
};

export default LoginSMS;
