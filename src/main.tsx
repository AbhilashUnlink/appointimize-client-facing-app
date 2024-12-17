import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./responsive.css";
// import Cancel from "./pages/Cancel.tsx";
// import Cart from "./pages/Cart.tsx";
// import Category from "./pages/Category.tsx";
// import Favorite from "./pages/Favorite.tsx";
import NotFound from "./pages/NotFound.tsx";
// import Orders from "./pages/Orders.tsx";
// import Product from "./pages/Product.tsx";
// import Profile from "./pages/Profile.tsx";
// import Success from "./pages/Success.tsx";
import { Provider } from 'react-redux'
import Layout from "./ui/Layout.tsx";
import { store } from "./lib/store.ts";
import Salon from "./pages/Salon.tsx";

const RouterLayout = () => {
  return (
    <Layout>
      <ScrollRestoration />
      <Outlet />
    </Layout>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/salon/:id",
        element: <Salon />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
