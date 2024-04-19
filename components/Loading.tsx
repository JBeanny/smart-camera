import { CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";

const override: CSSProperties = {
  display: "block",
  borderColor: "red",
  position: "absolute",
  width: "100px",
  height: "100px",
  left: "50%",
  bottom: "50%",
  marginBottom: "-50px",
  marginLeft: "-50px",
};

export const Loading = ({ loading }: { loading: boolean }) => {
  return (
    <div className="sweet-loading">
      <HashLoader
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
