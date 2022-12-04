import useTitle from "../hooks/use-title";

const NotFound = () => {
  useTitle("Not Found");

  return (
    <div className="flex flex-col">
      <h1 className="mt-10 py-10 text-center text-4xl text-gray-600">404</h1>
      <h1 className="py-10 text-center text-2xl text-gray-400">Page not found</h1>
    </div>
  );
};

export default NotFound;
