import { IconCheck } from "./icons";

const FormInputButton = props => {
  let cssClasses = props.error ? "border-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"

  return (
    <form onSubmit={props.onSubmit}>
      <div className="relative w-full">
        <input
          type={props.type}
          placeholder={props.placeholder}
          className={`block w-full rounded-lg border bg-gray-50 p-2 text-sm text-gray-900 ${cssClasses}`}
        />
        <button
          type="submit"
          className="absolute right-1 bottom-1 rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <IconCheck cssClasses="h-3.5 w-4" />
        </button>
      </div>
    </form>
  );
};

export default FormInputButton;
