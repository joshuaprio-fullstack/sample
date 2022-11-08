import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useEmployeesContext } from "./useEmployeesContext";

export const useFetchEmployees = () => {
  const { user } = useAuthContext();
  const { dispatch } = useEmployeesContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    setIsLoading(true);

    const response = await fetch(
      process.env.REACT_APP_BACKEND + "api/all-employees",
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const employees = await response.json();

    if (response.ok) {
      setIsLoading(false);
      dispatch({ type: "SET_EMPLOYEES", payload: employees });
      return;
    }

    if (!response.ok) {
      setError("Error");
    }
  };

  return { fetchEmployees, isLoading, error };
};

export default useFetchEmployees;
