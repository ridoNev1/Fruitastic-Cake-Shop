import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/homepage";
import App from "./App";
import CakesList from "./pages/cakes";
import ContactPage from "./pages/contact";
import CartPage from "./pages/cart-page";
import ProfilePage from "./pages/EditProfile";
import { MyOrdersPage } from "./pages/MyOrdersPage";
import { AdminOrdersPage } from "./pages/AdminOrdersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/cakes",
        element: <CakesList />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/cart-page",
        element: <CartPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/my-orders",
        element: <MyOrdersPage />,
      },
      {
        path: "/admin/all-orders",
        element: <AdminOrdersPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
