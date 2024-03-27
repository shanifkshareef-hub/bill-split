import { Router } from "express";
import users from "./users";
import expenses from "./expenses";

export default () => {
  const app = Router();
  users(app);
  expenses(app);

  return app;
};
