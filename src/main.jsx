import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import AuthContextProvider from "./components/context/AuthContextProvider.jsx";
import Layout from "./components/Layout.jsx";
import LoginForm from "./components/Authentication/Login/LoginForm.jsx";
import RegistrationForm from "./components/Authentication/Registration/RegistrationForm.jsx";
import CourseList from "./pages/Courses/CourseList.jsx";

import Profile from "./pages/Profile/Profile.jsx";

import { Provider } from "react-redux";

import store, { persistStorage } from "./pages/Store/index.jsx";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    element: (
      <AuthContextProvider>
        <Layout></Layout>
      </AuthContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <LoginForm></LoginForm>,
      },
      {
        path: "/registration",
        element: <RegistrationForm></RegistrationForm>,
      },
      {
        path: "/courses",
        element: <CourseList></CourseList>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistStorage}>
      <RouterProvider router={router}></RouterProvider>
    </PersistGate>
  </Provider>
);
