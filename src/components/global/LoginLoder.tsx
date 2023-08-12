import BeatLoader from "react-spinners/BeatLoader";

const LoginLoader = () => {
  return (
    <div className="sweet-loading">
      <BeatLoader
        color="#ffffff"
        size={3}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default LoginLoader