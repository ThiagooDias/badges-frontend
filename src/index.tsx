import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Modal from "react-modal";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

Modal.setAppElement('#root')

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
