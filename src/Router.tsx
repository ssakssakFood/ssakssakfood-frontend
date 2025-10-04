import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import Home from "./Home";
import Layout from "./layout/HomePage";
import ErrorPage from "./pages/ErrorPage";
import TermPage from "./pages/login/TermPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/term", element: <TermPage /> },
  { path: "*", element: <ErrorPage /> },
]);

export default router;
