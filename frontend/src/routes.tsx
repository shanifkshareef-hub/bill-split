import { Navigate, RouteObject } from "react-router-dom";

import { isAuthenticated } from "@utils/helpers";

import Main from "@layouts/Main";

import Expenses from "@pages/Expenses";
import ExpenseDetails from "@pages/Expenses/Details";

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
        path: "expenses/:id",
        element: <ExpenseDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/app/expenses"} />,
  },
];

export default routes;
