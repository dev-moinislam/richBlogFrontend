import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { IUser } from '../../utils/interface';

export interface AuthState {
    access_token: string | null;
    user:IUser | null

}

const initialState: AuthState = {

    access_token:null,
    user:null

}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
     const {access_token,user}=action.payload
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          access_token:access_token,
          user:user

        })
      )


      state.access_token=access_token
      state.user=user



    },
    logOut:(state) => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("catInfo");
      state.access_token=null
      state.user=null

     },

  },
})

// Action creators are generated for each case reducer function
export const {  setUser,logOut } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer