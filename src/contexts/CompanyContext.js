import { createContext, useReducer } from "react";

export const CompanyContext = createContext();

export const companyReducer = async (state, action) => {
  switch (action.type) {
    case "SET_COMPANY":
      return {
        company: action.payload,
      };
    case "CLEAR_COMPANY":
      return {
        company: "",
      };
    default:
      return state;
  }
};

export const CompanyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, {
    company: "",
  });

  return (
    <CompanyContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CompanyContext.Provider>
  );
};
