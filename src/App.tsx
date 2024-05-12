import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/global/Header';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
// import { bcategoryApi } from './redux/api/bcategoryApi';




const App = () => {


  return (
    // <ApiProvider api={bcategoryApi}>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="37269862686-0tup36j68sj9s01gnpl7kdkh0q371lhr.apps.googleusercontent.com">
          <Header/>
          <Outlet/>
        <ToastContainer/>
        </GoogleOAuthProvider>
      </Provider>
      // </ApiProvider>
  )
};

export default App
