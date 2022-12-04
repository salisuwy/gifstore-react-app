import { Link } from "react-router-dom";
import { IconArrowNext, IconArrowPrevious } from "./icons";
import { getURLSearchPath } from "../services/route-service";

const Paginator = (props) => {
  const { currentPage, pageSize, totalCount } = props;

  return (
    <div className="relative mt-5 h-14 px-10">
      {currentPage > 1 && (
        <Link
          to={getURLSearchPath(currentPage - 1)}
          className={
            "absolute top-0 left-2 flex min-w-[150px] justify-between rounded border border-gray-400 px-5 py-2 hover:bg-gray-50 hover:ring-1"
          }
        >
          <IconArrowPrevious cssClasses="h-6 w-6 mr-3" />
          Previous
        </Link>
      )}

      {currentPage * pageSize < totalCount && (
        <Link
          to={getURLSearchPath(currentPage + 1)}
          className={
            "absolute top-0 right-2 flex min-w-[150px] justify-between rounded border border-gray-400 px-5 py-2 hover:bg-gray-50 hover:ring-1"
          }
        >
          Next
          <IconArrowNext cssClasses="h-6 w-6 ml-3" />
        </Link>
      )}
    </div>
  );
};

export default Paginator;
