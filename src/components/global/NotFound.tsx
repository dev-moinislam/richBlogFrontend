

const NotFound = () => {
  return (
    <>
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
       <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-xl md:text-3xl font-bold mb-4 sm:text-2xl text-center">404 Not Found</h1>
        <p className="text-base md:text-lg mb-4 text-center">Oops! The page you are looking for does not exist.</p>
        <img
          src="images/404-error.png" 
          alt="404 Not Found"
          className="mx-auto w-64 h-64 object-contain"
        />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
    </>
  )
}

export default NotFound