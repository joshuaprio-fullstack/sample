import { useContext } from "react";
import { EmployeeContext } from "../contexts/EmployeeContext";

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw Error(
      "useEmployeeContext must be used inside an EmployeeContextProvider"
    );
  }

  return context;
};
