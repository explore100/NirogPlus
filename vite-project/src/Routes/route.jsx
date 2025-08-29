import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Components/Login";
import SignUp from "../Components/Signup";
import ProtectedRoute from "../Components/ProtectedRoute";
import DashboardLayout from "../Layout/DashboardLayout";

import About from "../Pages/About";
import Support from "../Pages/Support";
import Help from "../Pages/Help";
import Homepage from "../Pages/Home";
import AdminDashboard from "../Admin/AdminDashboard";
import CustomerDashboard from "../Admin/CustomerDashboard";
import SpareParts from "../Admin/SpareParts";

import AdminD from "../Pages/AdminD";
import ViewSpareParts from "../Pages/ViewSpareParts";
import Cart from "../Pages/Cart";
import Billing from "../Checkout/Billing";
import Orderplacement from "../Pages/Orderplacement";
import NirogAi from "../Pages/NirogAi";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "home", element: <Homepage /> },
          { path: "about", element: <About /> },
          { path: "support", element: <Support /> },
          { path: "help", element: <Help /> },
          { path: "spare-parts", element: <ViewSpareParts /> },
          { path: "cart", element: <Cart /> },
          { path: "billing", element: <Billing />},
          {path: "orderplacement", element: <Orderplacement />},
          { path: "Nirog", element: <NirogAi />},
         

          //admin  dashboard
          {
            path: "admin",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminD />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin/spare-parts",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <SpareParts />
              </ProtectedRoute>
            ),
          },
        
         
        ],
      },
    ],
  },
]);
