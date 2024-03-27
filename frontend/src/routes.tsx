import { Navigate, RouteObject } from "react-router-dom";

import { isAuthenticated } from "@utils/helpers";

import Main from "@layouts/Main";

import Login from "@pages/Login";
import Dashboard from "@pages/Dashboard";

import Menu1 from "@components/Menu/Menu1";
import Menu2 from "@components/Menu/Menu2";

const Private = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to={"/"} />;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "app",
    element: <Main />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "menu",
        children: [
          {
            path: "menu1",
            element: <Private element={<Menu1 />} />,
          },
          {
            path: "menu2",
            element: <Private element={<Menu2 />} />,
          },
        ],
      },
    ],
  },
];

export default routes;
