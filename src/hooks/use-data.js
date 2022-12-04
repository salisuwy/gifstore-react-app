import { useContext, useEffect } from "react";
import { AppContext } from "../context/context-provider";
import constant from "../services/constant";

const useData = () => {
  const [state, dispatch] = useContext(AppContext);
  const { items, user } = state;

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (userInfo.expiry < Date.now()) {
        dispatch({ type: constant.LOGOUT_USER });
        return;
      }
      dispatch({ type: constant.LOGIN_USER, payload: userInfo });
    }
  }, []);

  return { items, user, dispatch };
};

export default useData;
