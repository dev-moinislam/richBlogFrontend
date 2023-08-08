import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import { Provider } from 'react-redux'
import { store } from './redux/store';




const App = () => {

  return (
      <Provider store={store}>
        <Header/>
          <Outlet/>
        <Footer/>
      </Provider>
  )
};

export default App
