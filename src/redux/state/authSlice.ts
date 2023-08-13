import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export interface AuthState {
  username:string | null;
  token:string | null
}

const initialState: AuthState = {
  username:null,
  token: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{username:string,token:string}>) => {
     
      localStorage.setItem(
        "user",
        JSON.stringify({
          username:action.payload.username,
          token:action.payload.token
        })
      )

      state.username=action.payload.username
      state.token=action.payload.token
    },
    // logout:(state)=>{
    //   localStorage.clear()
    //   state.username=null,
    //   state.token=null
    // }
  },
})

// Action creators are generated for each case reducer function
export const {  setUser } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer