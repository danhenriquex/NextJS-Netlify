import React, { createContext, useContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";

interface iAuthenticated {
  user: Object;
  Login?: () => any;
  Logout?: () => any;
  authReady?: boolean;
}

const AuthContext = createContext({ authReady: false } as iAuthenticated);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log("log event");
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
      console.log("logout event");
    });

    netlifyIdentity.init();

    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };

    // * init netlify idendity connection
  }, []);

  const Login = () => {
    netlifyIdentity.open();
  };

  const Logout = () => {
    netlifyIdentity.logout();
  };

  const context = { user, Login, Logout, authReady: !!user };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
