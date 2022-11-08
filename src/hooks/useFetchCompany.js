import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useCompanyContext } from "./useCompanyContext";

export const useFetchCompany = () => {
  const { user } = useAuthContext();
  const { dispatch } = useCompanyContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompany = async (id) => {
    setIsLoading(true);

    const response = await fetch(
      process.env.REACT_APP_BACKEND + "api/company/" + id,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const company = await response.json();

    if (response.ok) {
      setIsLoading(false);
      dispatch({ type: "SET_COMPANY", payload: company });
      return;
    }

    if (!response.ok) {
      setError("Error");
    }
  };

  return { fetchCompany, isLoading, error };
};

export default useFetchCompany;
