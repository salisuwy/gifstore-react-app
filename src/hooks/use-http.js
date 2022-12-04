import { useState } from "react";
import constant from "../services/constant";
import useData from "./use-data";

const useHttp = () => {
  const [httpState, setHttpState] = useState({
    status: constant.IDLE_STATE,
    error: "",
  });
  const { status, error } = httpState;
  const { dispatch } = useData();

  async function execute(fn, args, dispatchAction = null) {
    try {
      setHttpState((prev) => {
        return { ...prev, status: constant.LOADING_STATE };
      });

      const response = await fn(...args);
      setHttpState((prev) => {
        return { ...prev, status: constant.IDLE_STATE };
      });

      if (dispatchAction) {
        dispatch({ type: dispatchAction, payload: response });
        return true;
      }
      return response;
    } catch (error) {
      setHttpState((prev) => {
        return { ...prev, status: constant.ERROR_STATE, error };
      });
      if (dispatchAction) {
        throw false;      // return false
      }
      throw error;
    }
  }

  return { status, error, execute };
};

export default useHttp;
