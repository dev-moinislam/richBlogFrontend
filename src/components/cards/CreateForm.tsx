import React from 'react';
import { IBlog, IBlogCategory, InputChange } from '../../utils/interface';
import { useGetCategoryQuery } from '../../redux/api/bcategoryApi';


interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}

const CreateForm: React.FC<IProps> = ({ blog, setBlog }) => {
    
  // use rtk query function
    const {data} = useGetCategoryQuery({});

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
    console.log(name,value)
  };

  
  const handleChangeThumbnail = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      setBlog({ ...blog, thumbnail: file });
    }
  };


  return (
    <div className='flex justify-center items-center'>
    <form className=' font-Figtree flex flex-col p-8 bg-Yellow  max-w-[365px] gap-3.5 bg-white  rounded-2xl border border-black'>
      <div className="mb-4">
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={blog.title}
          name="title"
          onChange={handleChangeInput}
          placeholder='Write your blog title'
        />
        <small
          className="text-gray-500 opacity-70"
        >
          {blog.title.length}/50
        </small>
      </div>

      <div className="mb-4">
        <input
          type="file"
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          accept="image/*"
          onChange={handleChangeThumbnail}
        />
      </div>

      <div className="mb-4">
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          rows={4}
          value={blog.description}
          name="description"
          style={{ resize: 'none' }}
          onChange={handleChangeInput}
          placeholder='Write you blog description'
        />
        <small
          className="text-gray-500 opacity-70"
        >
          {blog.description.length}/200
        </small>
      </div>

      <div className="mb-4">
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-capitalize"
          value={blog.category}
          name="category"
          onChange={handleChangeInput}
        >
          <option value="">Choose a category</option>
          {data && data.categories.map((category:IBlogCategory) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </form>
    </div>
    
  );
};

export default CreateForm;
