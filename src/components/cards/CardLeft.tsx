import React from 'react';
import { Link } from 'react-router-dom';
import { IBlog } from '../../utils/interface';


interface IProps {
  blog: IBlog;
}

const CardLeft: React.FC<IProps> = ({ blog }) => {
    
  return (
    <div className="-z-20 font-Figtree flex justify-center items-center p-8 bg-Yellow">
      <main className="relative">
        <section className="relative z-20 flex flex-col max-w-[365px] gap-3.5 bg-white p-5 rounded-2xl border border-black">
          <div className="pb-2 w-72 h-36">
          {blog.thumbnail ? (
            <>
              {typeof blog.thumbnail === 'string' ? (
                <Link to={`/blog/${blog._id}`}>
                  <img
                    src={blog.thumbnail}
                    className="rounded-xl w-full h-full object-cover"
                    alt="thumbnail"
                  />
                </Link>
              ) : (
                <img
                  src={URL.createObjectURL(blog.thumbnail)}
                  className="rounded-xl w-full h-full object-cover"
                  alt="thumbnail"
                />
              )}
            </>
          ) : (
            <img
                  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjmnZGAKg1GZFhCLVKKLdPRmiaU3AkcKNck5mPjgnmSJAkDhDomF7vqp3gH2Z01WWvH3I&usqp=CAU"}
                  className="rounded-xl w-full h-full object-cover"
                  alt="thumbnail"
                />
          )
        
        }

          </div>
          <p className="text-xs w-fit bg-Yellow font-bold rounded-md py-1">Category</p>
  
          <p className="text-xs">Published 10 Feb 2024</p>
          {
            blog.title ? (
              <h2 className="text-xl font-bold w-72 line-clamp-2">{blog.title}</h2>
            ) : (
              <h2 className="text-gray-300 text-xl font-bold w-72 line-clamp-2">Write your blog title ... </h2>
            )
          }
          {
            blog.description ? (
              <p className="text-gray-400 text-sm w-72 line-clamp-3">{blog.description}</p>
            ) : (
              <p className="text-gray-300 text-sm w-72 line-clamp-3">Write your blog description ... </p>
            )
          }
          <div className="flex items-center pt-5 gap-4">
            {/* <img className="w-6 h-6" src="img/image-avatar.webp" alt="avatar" />
            <p className="font-bold text-sm">Greg Hooper</p> */}
          </div>
        </section>
        <div className="h-full top-2 left-2 w-full absolute z-10 rounded-2xl bg-black"></div>
      </main>
    </div>

  );
};

export default CardLeft;
