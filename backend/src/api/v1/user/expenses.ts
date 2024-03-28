import { Router, Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import { Container } from "typedi";
import ExpenseService from "../../../services/expenses";
import validation from "../../../middlewares/validation";

const route = Router();

export default (app: Router) => {
  app.use("/expenses", route);

  // Get all expenses group
  route.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get("logger");
    try {
      const ExpenseServiceInstance = Container.get(ExpenseService);
      const data = await ExpenseServiceInstance.List();

      return res.json({
        status: true,
        data,
      });
    } catch (e) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });

  // Get an expenses group
  route.get(
    "/:id",
    validation.uuidParam,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");

      try {
        const { id } = req.params;
        const ExpenseServiceInstance = Container.get(ExpenseService);
        const data = await ExpenseServiceInstance.Get(id);

        return res.json({
          status: true,
          data,
        });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  // Create an expenses group
  route.post(
    "/",
    validation.expenseCreateSchema,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      try {
        const ExpenseServiceInstance = Container.get(ExpenseService);
        const data = await ExpenseServiceInstance.Create(req.body);

        return res.json({
          status: true,
          data,
        });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  // Update an expenses group
  route.put(
    "/:id",
    validation.expenseUpdateSchema,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      const { id } = req.params;
      try {
        const ExpenseServiceInstance = Container.get(ExpenseService);
        const data = await ExpenseServiceInstance.Update(id, req.body);

        return res.json({
          status: true,
          data: data,
        });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  // Delete an expenses group
  route.delete(
    "/:id",
    validation.uuidParam,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      try {
        let id = req.params.id as string;
        const ExpenseServiceInstance = Container.get(ExpenseService);
        const data = await ExpenseServiceInstance.Delete(id);

        return res.json({
          status: true,
          data: data,
        });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );
};
