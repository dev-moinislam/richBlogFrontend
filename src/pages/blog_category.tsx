import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdCancel } from "react-icons/md";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setBlogCategory } from '../redux/state/bCategorySlice';
import { selectAuth } from '../redux/state/authSlice';
import NotFound from '../components/global/NotFound';
import { useCreateCategoryMutation, useDeleteBlogCategoryMutation, useGetCategoryQuery, useUpdateBlogCategoryMutation } from '../redux/api/bcategoryApi';
import { IBlogCategory } from '../utils/interface';
import PreLoder from '../components/global/PreLoder';
import { toast } from 'react-toastify';

const CategoryManagement: React.FC = () => {
  const { user } = useAppSelector(selectAuth);
  const dispatch=useAppDispatch()

  // use rtk query function
  const {data: categoriesData,isLoading: isCategoriesLoading,isSuccess:isCategorySuccess,refetch: refetchCategories} = useGetCategoryQuery({});

  const [createCategory, { isSuccess: createCategoryIsSuccess, isError: createCategoryIsError, error: createCategoryError }] = useCreateCategoryMutation();

  const [updateCategory,{data:updateCategoryData,isSuccess:isCategoriesUpdateSuccess,isError:isUpdateCategoryError,error:updateCategoryError}]=useUpdateBlogCategoryMutation()

  const [deleteCategory,{data:deleteCategoryData,isSuccess:isCategoriesDeleteSuccess,isError:isDeleteCategoryError,error:deleteCategoryError}]=useDeleteBlogCategoryMutation()

  
  // state declare
  const [newCategory, setNewCategory] = useState<string>('');
  const [isEdit,setIsEdit]=useState<boolean>(false);
  const [categoryId,setCategoryId]=useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); 
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<string>('');

  // Add category function
  const handleAddCategory = async () => {
    try {
      if (newCategory.trim() !== '') {
        setNewCategory('');
        await createCategory({ name: newCategory, role: user?.role });
      }
    } catch (err) {
      console.error(err);
    }
  };


  // update category function
  const handleUpdateCategory=async()=>{
    try {
      if (newCategory.trim() !== '') {
        setNewCategory('');
        if(categoryId){
          await updateCategory({ role: user?.role, id:categoryId ,name: newCategory});
        }
        setIsEdit(false)
      }

    } catch (err) {
      console.error(err);
    }
  }


   // delete category function
   const handleDeleteCategory = async () => {
    try {
      await deleteCategory({ role: user?.role, id: categoryIdToDelete });
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
      setShowDeleteModal(false);
    }
  };


  // handle open for update user
  const handleOpen = (category: IBlogCategory) => {
    setNewCategory(category.name);
    setIsEdit(true)
    setCategoryId(category._id);
  };


  // Handle Cancel Update
 const handleCancelUpdate=()=>{
  setNewCategory('')
  setIsEdit(false)
 }


   // handle delete model
   const handleOpenDeleteModal = (categoryId: string) => {
    setShowDeleteModal(true);
    setCategoryIdToDelete(categoryId);
  };

 
  


 // useEffect for add new Categories
  useEffect(() => {
    if (createCategoryIsSuccess) {
      toast.success('Category Created successfully');
      refetchCategories(); 
    } else if (createCategoryIsError) {
      toast.error(`${(createCategoryError as any).data?.msg}`);
    }
  }, [createCategoryIsSuccess, createCategoryIsError]);



 // useEffect for add updated Categories
  useEffect(() => {
    if (isCategoriesUpdateSuccess) {
      toast.success(`${updateCategoryData.msg}`);
      refetchCategories(); 
    } else if (isUpdateCategoryError) {
      toast.error(`${(updateCategoryError as any).data.msg}`);
    }
  }, [isCategoriesUpdateSuccess,isUpdateCategoryError]);



// useEffect for add delete Categories
 useEffect(() => {
  if (isCategoriesDeleteSuccess) {
    toast.success(`${deleteCategoryData.msg}`);
    refetchCategories(); 
  } else if (isDeleteCategoryError) {
    toast.error(`${(deleteCategoryError as any).data.msg}`);
  }
}, [isCategoriesDeleteSuccess, isDeleteCategoryError]);


// useEffect(() => {
//   if (isCategorySuccess && categoriesData) {
//     dispatch(setBlogCategory(categoriesData.categories));
//   }
// }, [isCategorySuccess]);



  // user role check
  if (user?.role !== 'admin') {
    return <NotFound />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-8 mt-16">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">Category Management</h1>

        {/* Add Category Form */}
        <form className="flex justify-center items-center space-x-2 mb-4">
          <input
            type="text"
            className="auto sm:flex-grow md:flex-grow border rounded-l-lg p-2 focus:outline-none"
            placeholder={isEdit ? "Update Category" : "Add New Category"}
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

          {
            isEdit ? (
            
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-lg"
              onClick={()=>handleUpdateCategory()}
          >
            Update
          </button>) : (
            <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-lg"
            onClick={handleAddCategory}
          >
            Add
          </button>
          )
          }
        </form>

        {/* Category List (Table) */}
        <table className="w-full border-4 rounded-lg">
          <thead>
            <tr className="bg-blue-200">
              <th className="p-4 text-left">Category Name</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="mx-4">
            {isCategoriesLoading  ? (
              <tr>
                <td colSpan={2} className="text-center">
                  <PreLoder />
                </td>
              </tr>
            ) : (
              <>
                {categoriesData.categories.map((category: IBlogCategory, index: number) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}>
                    <td className="p-2">{category.name}</td>
                    <td className="p-3 flex justify-end items-center space-x-2">
                      {isEdit && categoryId === category._id ? (
                        <>
                          <button onClick={() => handleCancelUpdate()} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded">
                            <MdCancel />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleOpen(category)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded">
                            <FaEdit />
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                            onClick={() => handleOpenDeleteModal(category._id)}
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}

              </>
            )}
          </tbody>
        </table>

        {/* Delete Modal */}
          {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg">
              <p className="text-xl mb-4">Are you sure you want to delete this category?</p>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2"
                  onClick={handleDeleteCategory}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryManagement;
