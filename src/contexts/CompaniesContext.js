import { createContext, useReducer } from "react";

export const CompaniesContext = createContext();

export const companiesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COMPANIES":
      return {
        companies: [action.payload, ...state.companies],
      };
    case "SET_COMPANIES":
      return {
        companies: action.payload,
      };
    case "DELETE_COMPANIES":
      return {
        companies: state.companies.filter(
          (company) => company._id !== action.payload._id
        ),
      };
    case "CLEAR_COMPANIES":
      return {
        companies: "",
      };
    default:
      return state;
  }
};

export const CompaniesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companiesReducer, {
    companies: [],
  });

  return (
    <CompaniesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CompaniesContext.Provider>
  );
};
