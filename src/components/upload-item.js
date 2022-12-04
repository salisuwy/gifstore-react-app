import { IconCheckDone, IconClose, IconCloseSolid } from "./icons";

const UploadItem = (props) => {
  const { index, fileName, status, progress, onAbort } = props;
  return (
    <div className="relative mb-3 rounded-md bg-[#F5F7FB] py-4 px-8 last:mb-0">
      <div className="flex items-center justify-between">
        <span className="flex justify-center truncate pr-3 align-middle text-base font-medium text-[#07074D]">
          {fileName}
          {status === 1 && progress === 100 && (
            <IconCheckDone cssClasses="w-5 h-5 text-green-600 ml-2 mt-1" />
          )}
          {status === 0 && (
            <IconCloseSolid cssClasses="w-5 h-5 text-red-600 ml-2 mt-1" />
          )}
        </span>
        {status === 1 && progress < 100 && (
          <button onClick={() => onAbort(index)}>
            <IconClose cssClasses="w-5 hover:text-red-700 ml-3" />
          </button>
        )}
      </div>
      <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
        <div
          style={{ width: `${progress}%` }}
          className={`absolute left-0 right-0 h-full rounded-lg bg-[#6A64F1]`}
        ></div>
      </div>
    </div>
  );
};

export default UploadItem;
