import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "50% auto",
  transform:'translateY(-50%)',
  borderColor: "green",
};

const PreLoder = () => {

  return (
    <div className="sweet-loading">
      <ClipLoader
        cssOverride={override}
        size={160}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default PreLoder