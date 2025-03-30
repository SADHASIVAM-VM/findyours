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
import {ToastContainer} from'react-toastify'
import AboutPage from "./page/About";
import Navbar from "./component/Navbar";
import ChatList from "./component/ChatList";
import ChatComponent from "./component/Chat";

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
            <>
              <Home />
            </>
          ),
        },
        {
          path: "/report",
          element: (
            <PrivateRoute>
            <ReportItem />
          </PrivateRoute>
       
          ),
        },
        {
          path: "/all",
          element: (
          
            <PrivateRoute>
         
            <AllItems />
          </PrivateRoute>
           
          ),
        },
        {
          path: "/view/:id",
          element: (
       
            <PrivateRoute>
            <View />
          </PrivateRoute>
            
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
          path: "/chat",
          element: (
            <PrivateRoute>
              <ChatComponent/>
            </PrivateRoute>
          ),
        },
        {
          path:"/about",
          element:<AboutPage/>
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
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <RouterProvider router={Router} />
    </>
  );
};

export default App;
