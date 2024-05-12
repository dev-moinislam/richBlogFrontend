import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

interface Category {
    _id?: string;
    name: string;
  }

const initialState=[] as Category[]

export const bCategorySlice = createSlice({
  name: 'bCategory',
  initialState,
  reducers: {
    setBcategory: (state, action: PayloadAction<Category>) => {

     state.push(action.payload);


    },

  },
})

// Action creators are generated for each case reducer function
export const {  setBcategory } = bCategorySlice.actions
export const selectbCategory = (state: RootState) => state.bCategory
export default bCategorySlice.reducer