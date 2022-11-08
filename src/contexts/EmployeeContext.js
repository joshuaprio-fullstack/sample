import { createContext, useReducer } from "react";

export const EmployeeContext = createContext();

export const employeeReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLOYEE":
      return {
        employee: action.payload,
      };
    case "CLEAR_EMPLOYEE":
      return {
        employee: {},
      };
    default:
      return state;
  }
};

export const EmployeeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, {
    employee: {},
  });

  return (
    <EmployeeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
};
