import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    // Verifica se o valor é uma string válida antes de fazer o parse
    return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null; 
  });

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/backend/auth/login", inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};