import { forwardRef } from "react";

const FormInput = forwardRef((props, ref) => {
  let cssClasses = props.error ? "border-red-500" : "border-gray-300 focus:border-blue-400"
  let cssClasses2 = props.error ? "text-red-800" : "text-gray-800"

  return (
    <div className="mb-4">
      <label
        htmlFor={props.name}
        className={`mb-1 block font-medium ${cssClasses2}`}
      >
        {" "}
        {props.label}{" "}
      </label>
      <input
        type={props.type}
        name={props.name}
        ref={ref}
        placeholder={props.placeholder}
        className={`w-full rounded-md border bg-white py-2 px-4 text-base font-light text-gray-800 outline-none focus:shadow-md ${cssClasses}`}
      />
    </div>
  );
});

export default FormInput;
