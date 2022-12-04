import ReactDOM from "react-dom";

const Backdrop = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 z-20 h-[100vh] w-[100vw] bg-black opacity-75"
      onClick={onClick}
    ></div>,
    document.getElementById("backdrop")
  );
};

export default Backdrop;
