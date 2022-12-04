import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import useData from "../hooks/use-data";
import useHttp from "../hooks/use-http";
import {
  tagItem,
  untagItem,
  renameItem,
  shareItem,
  deleteItem,
} from "../services/http-service";
import DismissButton from "./dismiss-button";
import Hashtag from "./hashtag";
import constant from "../services/constant";
import { IconHashtag, IconTrash, IconWeb } from "./icons";
import ItemImage from "./item-image";
import FormInputButton from "./form-input-button";

const DrawerWrapper = (props) => {
  return ReactDOM.createPortal(
    <div
      className={`fixed right-0 top-0 z-30 h-screen w-96 overflow-y-auto bg-white p-4 duration-300 ease-in-out ${
        props.item ? "translate-x-0" : "translate-x-full"
      } `}
    >
      {props.item && <Drawer {...props} />}
    </div>,
    document.getElementById("drawer")
  );
};

const Drawer = (props) => {
  const [item, setItem] = useState(props.item);
  const dispatchUpdates = useRef(false);
  const { execute } = useHttp();
  const { user, dispatch } = useData();
  const itemPublicUrl = `http://localhost:3000/viewer/${item?.id}`;

  useEffect(() => {
    if (dispatchUpdates.current) {
      dispatch({ type: constant.UPDATE_ITEM, payload: item });
    } else {
      dispatchUpdates.current = true;
    }
  }, [item]);

  async function handleRename(e) {
    e.preventDefault();
    const displayName = e.target[0].value.trim();
    if (displayName.length > 0) {
      await execute(renameItem, [user.token, item.id, displayName]);
      setItem({ ...item, displayName });
      e.target[0].value = "";
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      await execute(deleteItem, [user.token, item.id]);
      props.closeDrawer(true);
    }
  }

  async function handleVisibility(status) {
    await execute(shareItem, [user.token, item.id, status]);
    setItem({ ...item, isPublic: status });
  }

  async function handleAddTag(e) {
    e.preventDefault();
    const title = e.target[0].value.trim();
    if (title.length > 0 && !item.tags.includes(title)) {
      await execute(tagItem, [user.token, item.id, title]);
      setItem({ ...item, tags: [...item.tags, title] });
      e.target[0].value = "";
    }
  }

  async function handleRemoveTag(title) {
    if (item.tags.includes(title)) {
      await execute(untagItem, [user.token, item.id, title])
      setItem({ ...item, tags: item.tags.filter((x) => x !== title) });
    }
  }

  async function handleCopyLink(e) {
    navigator.clipboard.writeText(itemPublicUrl);
    e.target.classList.add("animate-ping");
    setTimeout(() => {
      e.target.classList.remove("animate-ping");
    }, 1000);
  }

  return (
    <>
      <DismissButton onClick={props.closeDrawer} />

      <h4 className="mb-2 text-xl font-semibold text-gray-500">
        {item.displayName}
      </h4>
      <div className="flex flex-col">
        <ItemImage
          physicalName={item.physicalName}
          displayName={item.displayName}
          localSrc={item.localSrc}
          key={item.physicalName}
          overrideCss="h-auto justify-center align-middle max-w-full rounded-[40px]"
        />
      </div>
      <div className="relative mt-6">
        <label
          htmlFor="default-toggle"
          className="relative inline-flex cursor-pointer items-center"
        >
          <input
            onChange={(e) => handleVisibility(e.target.checked)}
            type="checkbox"
            checked={item.isPublic}
            id="default-toggle"
            className="peer sr-only"
          />
          <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
          <span className="ml-3 text-sm font-medium text-gray-900">
            Make Public
          </span>
        </label>

        <span className="absolute right-0 top-0 flex py-1 px-3 text-blue-800 outline-none hover:text-blue-500">
          <button
            onClick={handleCopyLink}
            className="px-3 text-xs font-bold uppercase"
          >
            Copy Link
          </button>
          <a
            href={itemPublicUrl}
            target="_blank"
            rel="noreferrer"
            title="open in new tab"
          >
            <IconWeb cssClasses="h-5 w-5 text-red-800 hover:animate-pulse" />
          </a>
        </span>
      </div>

      <div className="mt-5 flex h-auto">
        <div className="mr-3 w-full">
          <FormInputButton
            type="text"
            placeholder="Enter name"
            onSubmit={handleRename}
          />
        </div>
        <button
          onClick={handleDelete}
          className="h-9 rounded-lg bg-red-700 px-3 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-800"
        >
          <IconTrash cssClasses="h-3.5 w-3.5" />
        </button>
      </div>

      <hr className="my-8 h-1 w-full rounded border-0 bg-gray-200" />

      <div className="relative mb-5">
        <form onSubmit={handleAddTag}>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pr-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="add hashtag"
          />
          <IconHashtag cssClasses="h-5 w-5 absolute top-2 right-3 text-gray-400" />
        </form>
      </div>

      {item.tags.length > 0 ? (
        <Hashtag tags={item.tags} onDelete={handleRemoveTag} />
      ) : (
        <p className="text-gray-400">No hashtag</p>
      )}
    </>
  );
};

export default DrawerWrapper;
