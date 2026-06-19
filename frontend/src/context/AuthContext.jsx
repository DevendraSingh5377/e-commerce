import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [token, setToken] =
    useState(
      localStorage.getItem(
        "token"
      ) || ""
    );

  const [user, setUser] =
    useState(() => {
      const savedUser =
        localStorage.getItem(
          "user"
        );

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    });

  const login = (
    userData,
    jwtToken
  ) => {
    localStorage.setItem(
      "token",
      jwtToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        userData
      )
    );

    setToken(jwtToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isLoggedIn:
          token !== "",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth =
  () => useContext(AuthContext);