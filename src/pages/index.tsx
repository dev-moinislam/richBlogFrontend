
const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">Welcome, John Doe!</h2>
        <p className="text-white mb-6">
          Congratulations on creating your account. We're thrilled to have you as a member of our community.
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md">
          Verify Account
        </button>
      </div>
    </div>
  )
}

export default Home