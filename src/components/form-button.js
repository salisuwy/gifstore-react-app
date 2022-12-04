import React from "react";

const FormButton = (props) => {
  return (
    <div className="mb-6">
      <button
        type={props.type}
        className="w-full rounded-md bg-[#6A64F1] py-2 px-8 text-center text-base font-medium text-white outline-none hover:bg-[#3f3c90]"
      >
        {props.value}
      </button>
    </div>
  );
};

export default FormButton;
