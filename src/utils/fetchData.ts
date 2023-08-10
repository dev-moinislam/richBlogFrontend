import { API_URL } from './apiUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    loginUser:builder.mutation({
        query:(body:{account:string;password:string})=>{
            return {
                url:'api/login',
                method:'post',
                body
            }
        }
    })
  }),
})


export const { useLoginUserMutation } = loginApi