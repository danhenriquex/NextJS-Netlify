import React, { createContext, useContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";

interface iAuthenticated {
  user: Object;
  login?: () => {};
  logout?: () => {};
  authReady?: boolean;
}

const AuthContext = createContext({ authReady: false } as iAuthenticated);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // * init netlify idendity connection
    netlifyIdentity.init();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
