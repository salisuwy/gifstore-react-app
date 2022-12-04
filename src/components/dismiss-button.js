import React from "react";
import { IconClose } from "./icons";

const DismissButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
      onClick={onClick}
    >
      <IconClose cssClasses="w-5 h-5" />
    </button>
  );
};

export default DismissButton;
