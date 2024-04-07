import React from "react";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "../providers/AuthProvider.jsx";
import Cart from "./components/Cart.jsx";
import Home from "./components/Home.jsx";
import Main from "./components/Main.jsx";
import CoffeeDetails from "./components/sharedComponents/CoffeeDetails.jsx";
import InformationField from "./components/sharedComponents/InformationField.jsx";
import UpdateInformationField from "./components/sharedComponents/UpdateInformationField.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Users from "./components/Users.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InvoicePage from "./components/InvoicePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:5000/coffee"),
      },
      {
        path: "/insert",
        element: <InformationField></InformationField>,
        loader: () => fetch("http://localhost:5000/coffee"),
      },
      {
        path: "/update/:id",
        element: <UpdateInformationField></UpdateInformationField>,
        loader: () => fetch(`http://localhost:5000/coffee/`),
      },
      {
        path: "/details/:id",
        element: <CoffeeDetails></CoffeeDetails>,
        loader: () => fetch(`http://localhost:5000/coffee/`),
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/users",
        element: <Users></Users>,
        loader: () => fetch(`http://localhost:5000/users`),
        
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/invoiceHistory",
        element: <InvoicePage></InvoicePage>,
        loader: () => fetch("http://localhost:5000/coffee")
      }
      
    ],
  },
]);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
