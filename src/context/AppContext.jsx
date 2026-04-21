import React, { createContext, useContext, useReducer, useEffect } from "react";
import { appReducer, initialState } from "../reducer/appReducer";
import { getDataFromServer } from "../api";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH_START" });
    getDataFromServer()
      .then((orders) => {
        console.log("ORDERS:", orders);
        dispatch({ type: "FETCH_SUCCESS", payload: orders });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}