import React from 'react'
import { useCon } from '../controller/ContextController'
import LoginPage from '../page/Login';
import Cookies from "js-cookie";

import { useState, useEffect } from "react";

const PrivateRoute = ({ children }) => {
    const { user } = useCon();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [user]);

    if (loading) {
        return (
            <div className="w-screen h-[90vh] flex justify-center items-center">
                <p className="loader"></p>
            </div>
        );
    }

    return user ? children : <LoginPage />;
};

export default PrivateRoute;
