import React, { useState,useEffect } from 'react';
import Modal from 'react-modal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/state/authSlice';
import NotFound from '../components/global/NotFound';
import { useCreateCategoryMutation, useGetCategoryQuery } from '../redux/api/bcategoryApi';
import { IBlogCategory } from '../utils/interface';
import PreLoder from '../components/global/PreLoder';
import {toast}from 'react-toastify'
import { selectbCategory, setBcategory } from '../redux/state/bCategorySlice';

const CategoryManagement: React.FC = () => {
  const {user}=useAppSelector(selectAuth)
  const moin=useAppSelector(selectbCategory)
  const dispatch=useAppDispatch()
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isSuccess: isCategoriesSuccess,
    isError: isCategoriesError,
    error: categoriesError,
  }= useGetCategoryQuery({});

  console.log('total',categoriesData)
  // console.log('moin',moin)


  const [createCategory,{data:createCategoryData,isLoading:createCategoryIsLoding,isSuccess:createCategoryIsSuccess,isError:createCategoryIsError,error:createCategoryError}]=useCreateCategoryMutation()
// console.log('createCategoryData',createCategoryData)
console.log('createCategoryData',createCategoryData)
console.log('createCategoryIsSuccess',createCategoryIsSuccess)
console.log('createCategoryError',createCategoryError)




  // const [categories, setCategories] = useState<string[]>([]);
  // const [categories, setCategories] = useState<IBlogCategory[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  // const [editingCategory, setEditingCategory] = useState<number | null>(null);
  // const [editedCategory, setEditedCategory] = useState<string>('');
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // if (isCategoriesSuccess && categoriesData) {
    //   setCategories([...categoriesData.categories,...moin]);
    //   console.log('cat',categories)
    // }
    if (createCategoryIsSuccess) {
      // setCategories(categoriesData.categories);

      window.location.reload();
      toast.success('Category Created successfully')

      
    }else if(createCategoryIsError){
      toast.error(`${(createCategoryError as any).data.msg}`)
      console.log(createCategoryError)
    }
  }, [createCategoryIsSuccess,createCategoryIsError]);

  // const openModal = (index: number) => {
  //   setEditedCategory(categories[index]);
  //   setEditingCategory(index);
  //   setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  //   setEditingCategory(null);
  //   setEditedCategory('');
  // };

  const handleAddCategory = async () => {
    try{
      if (newCategory.trim() !== '') {
        // setCategories([...categories, newCategory]);
        setNewCategory('');
        await createCategory({name:newCategory,role:user?.role})
        // dispatch(setBcategory({name:newCategory}));
      }
    }catch(err){
      console.error(err);
    }
  };

  // const handleUpdateCategory = () => {
  //   if (editedCategory.trim() !== '') {
  //     const updatedCategories = [...categories];
  //     updatedCategories[editingCategory as number] = editedCategory;
  //     setCategories(updatedCategories);
  //     closeModal();
  //   }
  // };

  // const handleDeleteCategory = (index: number) => {
  //   const updatedCategories = [...categories];
  //   updatedCategories.splice(index, 1);
  //   setCategories(updatedCategories);
  // };

  /* --------------- Update categories state when data is loaded -------------- */
  // useEffect(() => {
  //   if (isCategoriesSuccess && categoriesData) {
  //     setCategories(categoriesData); // Assuming categoriesData is an array of category names
  //   }
  // }, [isCategoriesSuccess, categoriesData]);


  // useEffect(() => {
  //   toast.success('SuccessFully add category')
  // }, [isCategoriesSuccess, categoriesData,createCategoryIsSuccess]);



  

  if(user?.role !== 'admin'){
    return <NotFound/>
  }

  
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-8">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">Category Management</h1>

        {/* Add Category Form */}
        <form className="flex justify-center flex items-center space-x-2 mb-4">
          <input
            type="text"
            className="auto sm:flex-grow md:flex-grow border rounded-l-lg p-2 focus:outline-none"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-lg"
            onClick={handleAddCategory}
          >
            Add
          </button>
        </form>

        {/* Category List (Table) */}
        <table className="w-full">
          <thead>
            <tr className="bg-blue-200 ">
              <th className="p-4 text-left">Category Name</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="mx-4">
          {
            isCategoriesLoading ? (
              <tr>
              <td colSpan={2} className="text-center">
                <PreLoder />
              </td>
            </tr>

            ) :(
              <>
                    {categoriesData.categories.map((category:IBlogCategory, index:number) => (
                      <tr key={index} className="bg-blue-100 px-4">
                        <td className="p-2">
                            {category.name}
                        </td>
                        <td className="p-3 flex justify-end items-center space-x-2">
                          <>
                              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded">
                                <FaEdit /> 
                              </button>
                              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded">
                                <FaTrash /> 
                              </button>
                          </>
                        </td>
                      </tr>
                    ))}
              </>
            )
          }
          </tbody>
        </table>
      </div>

      {/* Update Category Modal */}
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Update Category"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-semibold mb-4">Update Category</h2>
        <input
          type="text"
          className="border p-2 rounded w-full focus:outline-none"
          value={editedCategory}
          onChange={(e) => setEditedCategory(e.target.value)}
        />
        <div className="text-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handleUpdateCategory}
          >
            Save
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded ml-2"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal> */}
    </div>
  );
};

export default CategoryManagement;







// {/* <td className="p-2">
//                   {editingCategory === index ? (
//                     <input
//                       type="text"
//                       className="border p-2 h-8 rounded w-full focus:outline-none"
//                       value={editedCategory}
//                       onChange={(e) => setEditedCategory(e.target.value)}
//                     />
//                   ) : (
//                     category.name
//                   )}
//                 </td>
//                 <td className="p-3 flex justify-end items-center space-x-2">
//                   {editingCategory === index ? (
//                     <>
//                       <button
//                         className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm py-1 px-2 rounded"
//                         onClick={handleUpdateCategory}
//                       >
//                         Save
//                       </button>
//                       <button
//                         className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1 px-2 rounded"
//                         onClick={closeModal}
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded"
//                         onClick={() => openModal(index)}
//                       >
//                         <FaEdit /> {/* Edit icon */}
//                       </button>
//                       <button
//                         className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
//                         onClick={() => handleDeleteCategory(index)}
//                       >
//                         <FaTrash /> {/* Delete icon */}
//                       </button>
//                     </>
//                   )}
//                 </td> */}
