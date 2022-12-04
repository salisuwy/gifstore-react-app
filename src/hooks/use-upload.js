import { useState, useRef } from "react";
import constant from "../services/constant";
import { uploadItem } from "../services/http-service";
import useData from "./use-data";
import useHttp from "./use-http";

const useUpload = (reloadFunction = null) => {
  const [files, setFiles] = useState([]);
  const inputFileRef = useRef();
  const { user, dispatch } = useData();
  const { status, error, execute } = useHttp();

  function abortAllUpload() {
    for (let i = 0; i < files.length; i++) {
      abortFileUpload(i);
    }
    setFiles([]);
  }

  function abortFileUpload(uploadIndex) {
    files[uploadIndex].controller.abort("Aborted by User");
    updateLocalFilesState(uploadIndex, { status: 0 });
  }

  function onProgress(progress, uploadIndex, controller) {
    let uploadedPercentage = Math.floor(
      (100 * progress.loaded) / progress.total
    );
    updateLocalFilesState(uploadIndex, {
      progress: uploadedPercentage,
      controller: controller,
    });

    if (reloadFunction && uploadedPercentage === 100) {
      reloadFunction();
    }
  }

  function handleUpload(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "drop" || event.type === "change") {
      const selectedFiles =
        event.dataTransfer?.files ?? inputFileRef.current.files;
      const selectedFilesArray = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        if (
          selectedFiles[i].type !== constant.ALLOWED_FILE_TYPE ||
          selectedFiles[i].size > constant.MAX_FILE_SIZE
        )
          continue;

        selectedFilesArray.push({
          fileName: selectedFiles[i].name,
          progress: 0,
          status: 1,
          controller: null,
        });
        const formData = new FormData();
        formData.append("file", selectedFiles[i]);
        execute(uploadItem, [user?.token, formData, i, onProgress], null)
          .then((res) => console.log("Upload complete: ", res))
          .catch((err) => console.error("Upload failed: ", err));
      }
      setFiles(selectedFilesArray);
    }
  }

  function updateLocalFilesState(fileIndex, args) {
    setFiles((currentFiles) =>
      currentFiles.map((currentFile, index) => {
        if (index === fileIndex) {
          return { ...currentFile, ...args };
        }
        return currentFile;
      })
    );
  }

  return { handleUpload, inputFileRef, abortAllUpload, abortFileUpload, files };
};

export default useUpload;
