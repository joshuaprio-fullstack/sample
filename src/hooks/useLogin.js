import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { AuthAction } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);

    const response = await fetch(process.env.REACT_APP_BACKEND + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (response.ok) {
      setIsLoading(false);
      setError(null);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: AuthAction.LOGIN, payload: json });
      navigate("/");
    }

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
  };

  return { login, error, isLoading };
};
