import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useEmployeeContext } from "./useEmployeeContext";

export const useFetchEmployee = () => {
  const { user } = useAuthContext();
  const { dispatch } = useEmployeeContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployee = async (id) => {
    setIsLoading(true);

    const response = await fetch(
      process.env.REACT_APP_BACKEND + "api/employee/" + id,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const employee = await response.json();

    if (response.ok) {
      dispatch({ type: "CLEAR_EMPLOYEE", payload: employee });
      dispatch({ type: "SET_EMPLOYEE", payload: employee });
      setIsLoading(false);
      return;
    }

    if (!response.ok) {
      setError("Error");
    }
  };

  return { fetchEmployee, isLoading, error };
};

export default useFetchEmployee;
