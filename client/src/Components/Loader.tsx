import { useMusicProvider } from "Context/ProductsContext";
import { Bars } from "react-loader-spinner";

const Loader = () => {
  const { loading } = useMusicProvider();

  return (
    <div
      style={{
        display: loading ? "block" : "none",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Bars
        height="100"
        width="100"
        color="white"
        ariaLabel="bars-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
