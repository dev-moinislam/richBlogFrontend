import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export interface AuthState {
  account: string | null;
  avatar: string | null;
  role: number | null;
  type: string | null;
  username: string | null;
  access_token: string | null;
}

const initialState: AuthState = {
  account: null,
  avatar: null,
  role: null,
  type: null,
  username: null,
  access_token:null
}
// {account:string,avatar:string,role:string,type:string,username:string}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
     const {account,avatar,role,type,username,access_token}=action.payload
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          account: account,
          avatar: avatar,
          role: role,
          type: type,
          username: username,
          access_token:access_token

        })
      )

      state.account=account
      state.avatar=avatar
      state.role=role
      state.type=type
      state.username=username
      state.access_token=access_token




    },
    logOut:(state) => {
      localStorage.removeItem("userInfo");
      state.account=null
      state.avatar=null
      state.role=null
      state.type=null
      state.username=null
      state.access_token=null


 
     },

  },
})

// Action creators are generated for each case reducer function
export const {  setUser,logOut } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer