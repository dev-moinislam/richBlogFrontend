import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { IBlogCategory } from '../../utils/interface';

export interface categoriesState {
  categories:IBlogCategory | null

}

const initialState: categoriesState = {
  categories:null
}

// const initialState : IBlogCategory[] = []

export const blogCategorySlice = createSlice({
  name: 'blogCategory',
  initialState,
  reducers: {
    setBlogCategory: (state, action: PayloadAction<IBlogCategory>) => {
      localStorage.setItem(
        "catInfo",
        JSON.stringify({
          categories:action.payload

        })
      )
      state.categories=action.payload

        
    },

  },
})

// Action creators are generated for each case reducer function
export const {  setBlogCategory } = blogCategorySlice.actions
export const selectBlogCategory = (state: RootState) => state.blogCategory
export default blogCategorySlice.reducer