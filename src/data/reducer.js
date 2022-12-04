import constant from "../services/constant";

export const initialState = {
  items: null,
  user: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case constant.SET_ITEMS:
      return { ...state, items: action.payload };
    case constant.UPDATE_ITEM:
      const newItems = { ...state.items };
      newItems.items = newItems.items.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      return { ...state, items: newItems };
    case constant.SET_USER:
      const updatedInfo = {...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(updatedInfo));
      return { ...state, user: updatedInfo };
    case constant.LOGIN_USER:
      const userInfo = { ...action.payload };
      userInfo.expiry = Date.now() + 60 * 60 * 1000; // 1 hour expiry time
      localStorage.setItem("user", JSON.stringify(userInfo));
      return { ...state, user: userInfo };
    case constant.LOGOUT_USER:
      localStorage.clear();
      return { ...state, user: null };
    case constant.REGISTER_USER:
      return state;

    default:
      return state;
  }
};

export default reducer;
