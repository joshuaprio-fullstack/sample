import { createContext, useReducer } from "react";

export const EmployeesContext = createContext();

export const employeesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EMPLOYEES":
      return {
        employees: [action.payload, ...state.employees],
      };
    case "SET_EMPLOYEES":
      return {
        employees: action.payload,
      };
    case "DELETE_EMPLOYEES":
      return {
        employees: state.employees.filter(
          (employee) => employee._id !== action.payload._id
        ),
      };
    case "CLEAR_EMPLOYEES":
      return {
        employees: "",
      };
    case "FILTER_BY_COMPANY":
      return {
        employees: state.employees.filter(
          (employee) => employee.company === action.payload
        ),
      };
    default:
      return state;
  }
};

export const EmployeesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeesReducer, {
    employees: [],
  });

  return (
    <EmployeesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EmployeesContext.Provider>
  );
};
