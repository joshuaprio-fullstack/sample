import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useCompaniesContext } from "./useCompaniesContext";

export const useFetchCompanies = () => {
  const { user } = useAuthContext();
  const { dispatch } = useCompaniesContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompanies = async (
    field = "name",
    order = "1",
    limit = "0",
    skip = "0"
  ) => {
    setIsLoading(true);

    const response = await fetch(
      process.env.REACT_APP_BACKEND +
        `api/all-companies?field=${field}&order=${order}&limit=${limit}&skip=${skip}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const companies = await response.json();

    if (response.ok) {
      setIsLoading(false);
      dispatch({ type: "SET_COMPANIES", payload: companies });
      return;
    }

    if (!response.ok) {
      setError("Error");
    }
  };

  return { fetchCompanies, isLoading, error };
};

export default useFetchCompanies;
