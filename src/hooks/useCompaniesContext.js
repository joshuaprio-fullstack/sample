import { useContext } from "react";
import { CompaniesContext } from "../contexts/CompaniesContext";

export const useCompaniesContext = () => {
  const context = useContext(CompaniesContext);

  if (!context) {
    throw Error(
      "useCompaniesContext must be used inside an CompaniesContextProvider"
    );
  }

  return context;
};
