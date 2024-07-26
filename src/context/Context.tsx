import React, { createContext, useState, useContext, ReactNode } from "react";
import { Link, useHistory } from "react-router-dom";

interface AuthContextType {
  user: any;
  updateUser: Function;
  logout: Function;
}

interface UserData {
  isLoggedin: boolean;
  email: string;
  username: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const history = useHistory();
  const inititalUserState: UserData = {
    username: "",
    email: "",
    isLoggedin: false,
  };

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : inititalUserState;
  });

  const updateUser = (newUserData: UserData) => {
    setUser(newUserData);

    localStorage.setItem("userData", JSON.stringify(newUserData));
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
