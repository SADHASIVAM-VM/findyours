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
import { ToastContainer } from "react-toastify";
import AboutPage from "./page/About";
import ChatRoom from "./page/ChatRoom";
import { socket } from "./lib/socket";

const App = () => {
  const { user } = useCon();
  console.log(user)


// socket connection 
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);



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
          index: true,
          path: "/login",
          element: (
            <>
              <LoginPage/>
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
              <ChatRoom/>
            </PrivateRoute>
          ),
        },
        {
          path: "/about",
          element: <AboutPage />,
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
