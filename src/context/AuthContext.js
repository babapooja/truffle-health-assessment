import { createContext, useEffect, useState } from "react";
import { getItem } from "../lib/service";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const username = getItem("username");
    setCurrentUser(username);
    return () => {};
  }, []);

  return (
    <AuthContext.Provider value={{currentUser}}>{children}</AuthContext.Provider>
  );
};
