import React, { useEffect, useState, memo, forwardRef } from "react";
import useData from "../hooks/use-data";
import useHttp from "../hooks/use-http";
import constant from "../services/constant";
import { getItemImage } from "../services/http-service";

const ItemImage = forwardRef((props, ref) => {
  const { user } = useData();
  const { status, execute } = useHttp();
  const [image, setImage] = useState(null);
  const { physicalName, displayName, localSrc, overrideCss } = props;

  useEffect(() => {
    async function runEffect() {
      if (!localSrc) {
        const response = await execute(getItemImage, [user?.token ?? "", physicalName])
        let blob = new Blob([response], { type: constant.ALLOWED_FILE_TYPE })
        setImage(URL.createObjectURL(blob))
      }
    }

    runEffect();
  }, [physicalName, localSrc]);

  if(status === constant.ERROR_STATE) return <h1>Error...</h1>;

  if (!image && !localSrc) return <h1>Loading...</h1>;

  return (
    <img
      src={localSrc ?? image}
      ref={ref}
      alt={displayName}
      id={physicalName}
      className={
        overrideCss ??
        "h-full w-full object-cover object-center lg:h-full lg:w-full"
      }
    />
  );
});

export default memo(ItemImage); // memoized version of the image
