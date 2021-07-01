import React, { createContext, useContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";

interface User {
  id: string;
  email: string;
  token: { access_token: string };
  user_metadata: { full_name: string };
}

interface iAuthenticated {
  user: User;
  Login?: () => any;
  Logout?: () => any;
  authReady?: boolean;
}

const AuthContext = createContext({ authReady: false } as iAuthenticated);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log("log event");
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
      setLoading(false);
      console.log("logout event");
    });

    netlifyIdentity.on("init", (user) => {
      setUser(user);
      setAuthReady(true);
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

  const context = { user, Login, Logout, authReady };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
