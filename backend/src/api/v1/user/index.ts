import { Router } from "express";
import expenses from "./expenses";
import orders from "./orders";
import participants from "./participants";

export default () => {
  const app = Router();
  expenses(app);
  orders(app);
  participants(app);

  return app;
};
