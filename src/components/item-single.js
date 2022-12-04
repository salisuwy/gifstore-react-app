import { useRef } from "react";
import { IconVisible, IconInvisible } from "./icons";
import ItemImage from "./item-image";

const ItemSingle = ({ item, onClick }) => {
  const imageRef = useRef();

  return (
    <div
      className="group relative"
      onClick={() => onClick({ ...item, localSrc: imageRef.current.src })}
    >
      <div className="w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 h-72 lg:h-80">
        <ItemImage
          physicalName={item.physicalName}
          displayName={item.displayName}
          localSrc={item.localSrc}
          ref={imageRef}
          key={item.physicalName}
        />
      </div>

      {item.isPublic === true && (
        <IconVisible cssClasses="absolute top-2 right-2 h-8 w-8 text-gray-400" />
      )}

      {item.isPublic === false && (
        <IconInvisible cssClasses="absolute top-2 right-2 h-8 w-8 text-gray-400" />
      )}
    </div>
  );
};

export default ItemSingle;
