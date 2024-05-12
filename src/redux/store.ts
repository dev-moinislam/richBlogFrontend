import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/state/authSlice'
import bCategoryReducer from '../redux/state/bCategorySlice'
import { authApi } from './api/authApi'
import { bcategoryApi } from './api/bcategoryApi'




export const store = configureStore({
  reducer: {
    auth:authReducer,
    bCategory:bCategoryReducer,
    [authApi.reducerPath]: authApi.reducer,
    [bcategoryApi.reducerPath]: bcategoryApi.reducer,


  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware,bcategoryApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
