import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { RootStore, IBlog } from '../utils/TypeScript';

// import NotFound from '../components/global/NotFound';
import CreateForm from '../components/cards/CreateForm';
import CardLeft from '../components/cards/CardLeft';
import { IBlog } from '../utils/interface';

const CreateBlog: React.FC = () => {
  const initState = {
    user: '',
    title: '',
    content: '',
    description: '',
    thumbnail: '',
    category: '',
    createdAt: new Date().toISOString()
  };

  const [blog, setBlog] = useState<IBlog>(initState);

//   if (!auth.access_token) return <NotFound />;

  return (
<div className="flex min-h-screen justify-center flex-col md:flex-row items-center px-5 mt-16">
  <div className="w-full mt-7">
    <CreateForm blog={blog} setBlog={setBlog} />
  </div>
  <div className="w-full -z-40">
    <CardLeft blog={blog} />
  </div>
</div>
  );
};

export default CreateBlog;

