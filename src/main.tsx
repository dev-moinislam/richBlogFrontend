import React from 'react'
import ReactDOM from 'react-dom/client'
import routes from './router/router.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'

import Modal from 'react-modal';

// Set the app element (usually the root of your app)
Modal.setAppElement('#root'); 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
