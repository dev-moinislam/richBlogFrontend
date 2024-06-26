import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../utils/apiUrl'


export const blogCategoryApi = createApi({
  reducerPath: 'blogCategoryApi',
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
        query:(body:{role:string | undefined | null,id:string,name:string})=>{
            const { id } = body;
            return {
                url:`/api/category/${id}`,
                method:'PUT',
                body
            }
        }
    }),
    deleteBlogCategory:builder.mutation({
        query:(body:{role:string | undefined | null,id:string})=>{
            const { id } = body;
            return {
                url:`/api/category/${id}`,
                method:'DELETE',
                body
            }
        }
    }),




  }),
  
})


export const {useGetCategoryQuery,useCreateCategoryMutation,useUpdateBlogCategoryMutation,useDeleteBlogCategoryMutation} = blogCategoryApi