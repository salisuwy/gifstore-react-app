import React, { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import useData from "../hooks/use-data";
import useTitle from "../hooks/use-title";
import { getSingleItem } from "../services/http-service";
import constant from "../services/constant";
import { useParams } from "react-router-dom";
import Hashtag from "../components/hashtag";
import ItemImage from "../components/item-image";

const Viewer = () => {
  useTitle("Viewer");
  const { status, execute } = useHttp();
  const { user } = useData();
  const [item, setItem] = useState(null);
  let { itemId } = useParams();

  useEffect(() => {
    async function runEffect() {
      const response = await execute(getSingleItem, [user?.token ?? "", itemId])
      setItem(response)
    }
    runEffect();
  }, [itemId]);

  if (status === constant.ERROR_STATE) {
    return (
      <div
        className="mx-9 mt-6 rounded border-t-4 border-orange-400 bg-orange-50 p-3 px-4 text-gray-900 shadow-md"
        role="alert"
      >
        <div>
          <p className="font-bold">Error encountered</p>
          <p>This item is either not publicly accessible or does not exit.</p>
          <p>
            To make this item visible, click on the <b>Make Public</b> toggle
            button
          </p>
        </div>
      </div>
    );
  }
  if (status === constant.LOADING_STATE) {
    return <h1>Loading...</h1>;
  }

  return (
    item && (
      <div className="mx-auto flex w-full max-w-[550px] flex-col items-center bg-white">
        <h4 className="my-3 text-center text-2xl font-bold text-gray-500">
          {item.displayName}
        </h4>
        <div className="w-fit overflow-hidden rounded-lg border-4 border-gray-400 ring-4">
          <ItemImage
            physicalName={item.physicalName}
            displayName={item.displayName}
            key={item.physicalName}
          />
        </div>

        <hr className="my-8 h-1 w-full rounded bg-gray-200" />

        {item.tags.length > 0 ? (
          <Hashtag tags={item.tags} />
        ) : (
          <p className="text-gray-400">No hashtag</p>
        )}
      </div>
    )
  );
};

export default Viewer;
