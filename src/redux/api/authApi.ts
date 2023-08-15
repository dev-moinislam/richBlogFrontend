import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../utils/apiUrl'


// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_URL ,

}),
  
  endpoints: (builder) => ({
    loginUser:builder.mutation({
        query:(body:{account:string;password:string})=>{
            return {
                url:'/api/login',
                method:'post',
                body
            }
        }
    }),
    registerUser:builder.mutation({
      query:(body:{username:string,account:string;password:string})=>{
          return {
              url:'/api/register',
              method:'post',
              body
          }
      }
  }),
  verifyUser:builder.mutation({
    query:(body:{active_token:string})=>{
        return {
            url:'/api/active',
            method:'post',
            body
        }
    }
}),

verifyUserForForgetPass:builder.mutation({
    query:(body:{account:string})=>{
        return {
            url:'/api/forgot_password',
            method:'post',
            body
        }
    }
}),
updatePassword:builder.mutation({
    query:(body:{access_token:string,password:string})=>{
        return {
            url:'/api/reset_password',
            method:'put',
            body
        }
    }
}),




  }),
  
})


export const { useLoginUserMutation ,useRegisterUserMutation, useVerifyUserMutation,useVerifyUserForForgetPassMutation,useUpdatePasswordMutation } = authApi