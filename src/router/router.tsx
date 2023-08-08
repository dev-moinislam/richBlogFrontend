import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import PageRender from "../common/PageRender";




const routes = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
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
          ]
    }
  ]);

export default routes