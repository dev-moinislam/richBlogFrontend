import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../utils/apiUrl'


// Define a service using a base URL and expected endpoints
export const bcategoryApi = createApi({
  reducerPath: 'bcategoryApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_URL ,

}),

  endpoints: (builder) => ({
    
    getCategory:builder.query({
        query:()=> '/api/category'
    }),

    createCategory:builder.mutation({
        query:(body:{name:string,role:string | undefined | null})=>{
            return {
                url:'/api/category',
                method:'post',
                body
            }
        }
    }),
updateBlogCategory:builder.mutation({
    query:(body:{account:string,password:string})=>{
        return {
            url:'/api/user/update_password',
            method:'post',
            body
        }
    }
}),




  }),
  
})


export const {useGetCategoryQuery,useCreateCategoryMutation} = bcategoryApi