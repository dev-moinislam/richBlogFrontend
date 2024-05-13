import {useParams} from 'react-router-dom'
import { IParams } from '../utils/interface'
import { Suspense,lazy } from 'react'
import NotFound from '../components/global/NotFound'
import PreLoder from '../components/global/PreLoder'
import Home from '../pages'



const generatePage = (name: string) => {
  /* ------------------- dynamic import is asyncronous call ------------------- */
  const LazyComponent = lazy(() => import(/* @vite-ignore */`../pages/${name}`).catch(() => ({ default: NotFound })));

  return (
    <Suspense fallback={<PreLoder/>}>
      {
        name ?  <LazyComponent /> : <Home/>
      }
    </Suspense>
  );
};

const PageRender = () => {
    const {page,slug}:IParams=useParams()
    // console.log(page,slug)
    
    let name="";
    if(page){
      name= slug ? `${page}/[slug]` : `${page}`
    }
  
   return generatePage(name)
}

export default PageRender