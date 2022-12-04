import React from "react";

const Alert = (props) => {
  const cssClasses = {
    error: "border-red-500 bg-red-100 text-red-900",
    success: "border-teal-500 bg-teal-100 text-teal-900",
  };

  return (
    <div
      className={`border-t-4 px-4 rounded p-3 shadow-md mx-9 mt-6 ${props.cssClasses} ${
        cssClasses[props.type]
      }`}
      role="alert"
    >
      <div>
        <p className="font-bold">{props.title}</p>
        <p className="text-sm">{props.message}</p>
      </div>
    </div>
  );
};

export default Alert;
