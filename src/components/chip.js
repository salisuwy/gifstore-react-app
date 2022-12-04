import React from "react";
import { IconCloseSolid } from "./icons";

const Chip = (props) => {
  return (
    <span
      className={`mr-1 mb-2 flex w-max cursor-pointer rounded-full bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100 active:bg-gray-300 ${props.cssClasses}`}
    >
      {props.text}
      {props.onClick && (
        <button onClick={props.onClick}>
          <IconCloseSolid cssClasses="ml-3 w-5 h-5 -mr-1 text-sm" />
        </button>
      )}
    </span>
  );
};

export default Chip;
