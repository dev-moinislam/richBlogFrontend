import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/state/authSlice'
import blogCategoryReducer from '../redux/state/bCategorySlice'
import { authApi } from './api/authApi'
import { blogCategoryApi } from './api/bcategoryApi'




export const store = configureStore({
  reducer: {
    auth:authReducer,
    blogCategory:blogCategoryReducer,
    [authApi.reducerPath]: authApi.reducer,
    [blogCategoryApi.reducerPath]: blogCategoryApi.reducer,


  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware,blogCategoryApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
