import React from 'react'
import { useCon } from '../controller/ContextController'
import LoginPage from '../page/Login';
import Cookies from "js-cookie";

import { useState, useEffect } from "react";

const PrivateRoute = ({ children }) => {
    const { user } = useCon();
    const [loading, setLoading] = useState(true);
    
   const storedUser = JSON.parse(localStorage.getItem("user"));
    
useEffect(() => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    setLoading(false)
  } else {
    localStorage.removeItem("user");
  }
}, [user]);

    if (loading) {
        return (
            <div className="w-screen h-[90vh] flex justify-center items-center">
                <p className="loader"></p>
            </div>
        );
    }




return (storedUser || user) ? children : <LoginPage />;
};

export default PrivateRoute;
