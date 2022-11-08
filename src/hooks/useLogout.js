import { useAuthContext } from "./useAuthContext";
import { AuthAction } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      dispatch({ type: AuthAction.LOGOUT });
      navigate("login");
    }
  };

  return { logout };
};
