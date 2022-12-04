import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ItemSingle from "../components/item-single";
import SearchForm from "../components/search-form";
import Dropzone from "../components/dropzone";
import Backdrop from "../components/backdrop";
import DrawerWrapper from "../components/drawer-wrapper";
import { getItems, searchItems } from "../services/http-service";
import useTitle from "../hooks/use-title";
import useData from "../hooks/use-data";
import useHttp from "../hooks/use-http";
import constant from "../services/constant";
import Paginator from "../components/paginator";

const Dashboard = () => {
  useTitle("Dashboard");
  const [selectedItem, setSelectedItem] = useState(null);
  const [reload, setReload] = useState();
  const { user, items: data, dispatch } = useData();
  const { status, error, execute } = useHttp();
  const [queryParam, setQueryParam] = useSearchParams({});

  function triggerPageReload() {
    setReload((reload) => !reload);
  }

  function handleCloseDrawer(isDeleted = false) {
    if (isDeleted && typeof isDeleted == "boolean") {
      triggerPageReload();
    }
    setSelectedItem(null);
  }

  function handleSearch(e) {
    e.preventDefault();
    const text = e.target[0].value.trim();
    if (text.length > 0) {
      setQueryParam({ keyword: text, page: 1 });
    } else {
      setQueryParam({});
    }
  }

  useEffect(() => {
    const page = queryParam.get("page") || 1;
    const keyword = queryParam.get("keyword");
    const fetchFunction = keyword ? searchItems : getItems;
    const fetchArgs = keyword
      ? [user?.token ?? "", keyword, page]
      : [user?.token ?? "", page];
    execute(fetchFunction, fetchArgs, constant.SET_ITEMS);
  }, [queryParam, reload]);

  return (
    <>
      <SearchForm onSubmit={handleSearch} cssClasses="my-5" />
      <Dropzone cssClasses="mb-5" onPageReload={triggerPageReload} />

      {data?.items?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.items.map((item) => (
              <ItemSingle key={item.id} item={item} onClick={setSelectedItem} />
            ))}
          </div>

          <Paginator {...data} />
        </>
      ) : (
        <h1 className="py-10 text-center text-2xl text-gray-400">
          No items found
        </h1>
      )}

      {selectedItem && <Backdrop onClick={handleCloseDrawer} />}
      <DrawerWrapper item={selectedItem} closeDrawer={handleCloseDrawer} />
    </>
  );
};

export default Dashboard;
