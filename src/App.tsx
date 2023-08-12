import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const App = () => {

  return (
      <Provider store={store}>
        <Header/>
          <Outlet/>
        <Footer/>
        <ToastContainer/>
      </Provider>
  )
};

export default App
