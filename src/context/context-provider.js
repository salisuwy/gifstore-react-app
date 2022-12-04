import { useReducer, createContext } from "react";
import reducer, { initialState } from "../data/reducer";

export const AppContext = createContext({});

const ContextProvider = (props) => {
  const reducerRef = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={reducerRef}>
      { props.children }
    </AppContext.Provider>
  );
};

export default ContextProvider;
