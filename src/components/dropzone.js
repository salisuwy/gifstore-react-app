import useUpload from "../hooks/use-upload";
import DismissButton from "./dismiss-button";
import UploadItem from "./upload-item";

const Dropzone = (props) => {
  const { files, inputFileRef, handleUpload, abortFileUpload, abortAllUpload } =
    useUpload(props.onPageReload);

  return (
    <>
      <div
        className={`relative flex w-full items-center justify-center ${props.cssClasses}`}
        onDrop={handleUpload}
        onDragOver={handleUpload}
        onChange={handleUpload}
      >
        <label
          htmlFor="dropzone-file"
          className="flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mb-3 h-10 w-10 text-3xl text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">
              Allowed Files (Only GIF 10MB MAX)
            </p>
          </div>
          <input
            id="dropzone-file"
            ref={inputFileRef}
            type="file"
            multiple
            className="hidden"
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="fixed right-0 bottom-0 min-w-[375px] max-w-[500px] z-10 p-4 md:mb-3 md:mr-3 rounded border border-gray-300 bg-white flex flex-col">
          <div className="mb-2">
            <DismissButton onClick={abortAllUpload} />
            <h4 className="mb-2 text-xl font-bold text-gray-500">
              Uploading files
            </h4>
          </div>
          <div className="overflow-auto max-h-[320px]">
            {files.map((file, key) => (
              <UploadItem
                key={key}
                index={key}
                {...file}
                onAbort={abortFileUpload}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Dropzone;
