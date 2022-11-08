import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const AuthAction = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case AuthAction.LOGIN:
      return { user: action.payload };
    case AuthAction.LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [state, dispatch] = useReducer(authReducer, {
    user,
  });

  useEffect(() => {
    if (user) {
      dispatch({ type: AuthAction.LOGIN, payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
