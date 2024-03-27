import { Navigate, RouteObject } from "react-router-dom";

import { isAuthenticated } from "@utils/helpers";

import Main from "@layouts/Main";

import Dashboard from "@pages/Dashboard";

import Menu1 from "@components/Menu/Menu1";
import Menu2 from "@components/Menu/Menu2";
import Expenses from "@pages/Expenses";

const Default = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to={"/"} />;
};

const routes: RouteObject[] = [
  {
    path: "/app",
    element: <Main />,
    children: [
      {
        path: "expenses",
        element: <Expenses />,
      },
      {
        path: "menu",
        children: [
          {
            path: "menu1",
            element: <></>,
          },
          {
            path: "menu2",
            element: <></>,
          },
        ],
      },
    ],
  },
];

export default routes;
