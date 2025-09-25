import React, { useState, useEffect } from "react";
import { useCon } from "../controller/ContextController";
import LoginPage from "../page/Login";

const PrivateRoute = ({ children }) => {
  const { user } = useCon();
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (user) {
      // If user is in context, sync to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      setAuthUser(user);
    } else if (storedUser) {
      // If user is not in context, restore from localStorage
      setAuthUser(JSON.parse(storedUser));
    } else {
      setAuthUser(null);
    }

    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="w-screen h-[90vh] flex justify-center items-center">
        <p className="loader"></p>
      </div>
    );
  }

  return authUser ? children : <LoginPage />;
};

export default PrivateRoute;
