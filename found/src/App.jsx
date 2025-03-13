import React, { useEffect, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home";
import Layout from "./Layout/Layout";
import View from "./page/view";
import AllItems from "./page/AllItems";
import Dashboard from "./page/UserInfo";
import AdminDashboard from "./page/admin";
import LoginPage from "./page/Login";
import { useCon } from "./controller/ContextController";
import ReportItem from "./page/ReportItem";
import PrivateRoute from "./route/privateRoute";
import Cookies from "js-cookie";

const App = () => {
  const {user} = useCon()
  Cookies.set("userLoggedIn", "true",{ expires: 7 });
  // const local = em !==null &&localStorage.setItem("Localuser",em)
  // console.log(local)

  const Router = createBrowserRouter([
    {
      path: "/",

      element: <Layout />,
      children: [
        {
          index: true,
          path: "/",
          element: (
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          ),
        },
        {
          path: "/report",
          element: (
              <ReportItem />
       
          ),
        },
        {
          path: "/all",
          element: (
          
              <AllItems />
           
          ),
        },
        {
          path: "/view/:id",
          element: (
       
              <View />
            
          ),
        },
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: "/admin",
          element: (
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
};

export default App;
