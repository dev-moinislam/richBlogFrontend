
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    <div className="bg-white p-8 rounded-lg shadow-md w-80">
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
      <p className="text-gray-600 mb-4">
        Enter your email address to reset your password.
      </p>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-300"
            placeholder="Your email"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Reset Password
        </button>
      </form>
    </div>
  </div>
  )
}

export default Home