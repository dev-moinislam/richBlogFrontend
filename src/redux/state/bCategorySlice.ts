import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

interface Category {
    _id?: string;
    name: string;
  }

const initialState=[] as Category[]

export const blogCategorySlice = createSlice({
  name: 'blogCategory',
  initialState,
  reducers: {
    setBlogCategory: (state, action: PayloadAction<Category>) => {
     state.push(action.payload);


    },

  },
})

// Action creators are generated for each case reducer function
export const {  setBlogCategory } = blogCategorySlice.actions
export const selectBlogCategory = (state: RootState) => state.blogCategory
export default blogCategorySlice.reducer