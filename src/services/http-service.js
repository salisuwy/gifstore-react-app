import axios from "axios";
import { URL } from "./url";

axios.interceptors.response.use(
  (res) => {
    let response = res.data?.data ?? "Operation successful";
    if (res.headers["content-type"] === "image/gif") {
      response = res.data;
    }
    return response;
  },
  (err) => {
    //console.error(err);
    let error = err.response?.data?.message ?? err.response?.statusText;
    throw error;
  }
);

export function registerUser(email, fullname, password) {
  return axios.post(
    URL.REGISTER,
    { email, fullname, password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

export function loginUser(email, password) {
  return axios.post(
    URL.LOGIN,
    { email, password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

export function updateFullname(token = "", data) {
  return axios.put(URL.UPDATE_NAME, { data }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function updatePassword(token = "", data) {
  return axios.put(URL.UPDATE_PASSWORD, { data }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function getItems(token = "", page = 1) {
  return axios.get(URL.ITEMS, {
    params: { page },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function searchItems(token = "", keyword, page = 1) {
  return axios.get(URL.SEARCH, {
    params: { page, keyword },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getSingleItem(token = "", itemId) {
  return axios.get(URL.ITEMS + "/" + itemId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getItemImage(token = "", physicalName) {
  return axios.get(URL.FILE + "/" + physicalName, {
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function renameItem(token = "", itemId, data) {
  return axios.put(
    URL.ITEMS + "/" + itemId,
    { data },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function shareItem(token = "", itemId, data) {
  return axios.put(
    URL.SHARE + "/" + itemId,
    { data },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function deleteItem(token = "", itemId) {
  return axios.delete(URL.ITEMS + "/" + itemId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function tagItem(token = "", itemId, data) {
  return axios.post(
    URL.TAG + "/" + itemId,
    { data },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function untagItem(token = "", itemId, data) {
  return axios.delete(URL.TAG + "/" + itemId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      data: data,
    },
  });
}

export function uploadItem(token = "", form, uploadId, onProgress) {
  const controller = new AbortController();
  controller.signal.onabort = (e) => {
    console.warn("Upload Aborted: ", controller.signal.reason);
  };
  return axios.post(URL.ITEMS, form, {
    signal: controller.signal,
    headers: {
      "Content-Type": "multipart/form-data",
      "X-UPLOAD-ID": uploadId,
      Authorization: `Bearer ${token}`,
    },
    onUploadProgress: (progress) => {
      onProgress(progress, uploadId, controller);
    },
  });
}
