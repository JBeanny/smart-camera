import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  position: "absolute",
  right: "10px",
  width: "25px",
  height: "25px",
  top: "10px",
};

export const ClipLoading = ({ loading }: { loading: boolean }) => {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color="#36d7b7"
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
