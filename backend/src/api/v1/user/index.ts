import { Router } from "express";
import expenses from "./expenses";

export default () => {
  const app = Router();
  expenses(app);

  return app;
};
