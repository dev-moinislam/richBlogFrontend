import React, { useState } from 'react';
import CreateForm from '../components/cards/CreateForm';
import CardLeft from '../components/cards/CardLeft';
import { IBlog } from '../utils/interface';
import { useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/state/authSlice';
import NotFound from '../components/global/NotFound';

const CreateBlog: React.FC = () => {
  const { user } = useAppSelector(selectAuth);
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

  // user role check
    if (user?.role !== 'admin') {
      return <NotFound />;
    }
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

