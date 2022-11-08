import { useContext } from "react";
import { EmployeesContext } from "../contexts/EmployeesContext";

export const useEmployeesContext = () => {
  const context = useContext(EmployeesContext);

  if (!context) {
    throw Error(
      "useEmployeesContext must be used inside an EmployeesContextProvider"
    );
  }

  return context;
};
