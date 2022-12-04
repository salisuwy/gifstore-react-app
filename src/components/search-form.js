const SearchForm = ({ cssClasses, onSubmit }) => {
  return (
    <div className={cssClasses}>
      <form onSubmit={onSubmit}>
        <div className="relative">
          <input
            type="search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search by name and hashtags..."
          />
          <button
            type="submit"
            className="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
