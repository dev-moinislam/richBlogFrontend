import './App.css'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import PageRender from './common/PageRender';



const App = () => {


  const routes = [
    {
      path: "/",
      element:<PageRender/>,
    },
    {
      path: "/:page",
      element:<PageRender/>,
    },
     {
      path: "/:page/:slug",
      element: <PageRender/>,
    }
  ];

  return <RouterProvider router={createBrowserRouter(routes)} />
};

export default App
