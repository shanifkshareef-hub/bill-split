import { Router, Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import { Container } from "typedi";
import validation from "../../../middlewares/validation";
import { celebrate } from "celebrate";
import OrderService from "../../../services/orders";

const route = Router();

export default (app: Router) => {
  app.use("/orders", route);

  // Get all orders 
    route.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get("logger");
    try {
      const OrderServiceInstance = Container.get(OrderService);
      const data = await OrderServiceInstance.List();

      return res.json({
        status: true,
        data,
      });
    } catch (e) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });

  // Create an orders 
    route.post(
    "/",
    validation.orderCreateSchema,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      try {
        const OrderServiceInstance = Container.get(OrderService);
        const data = await OrderServiceInstance.Create(req.body);

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

  // Update an orders 
    route.put(
    "/:id",
    validation.orderUpdateSchema,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      try {
        let id = req.params.id as string;
        const OrderServiceInstance = Container.get(OrderService);
        const data = await OrderServiceInstance.Update(id, req.body);

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

  // Delete an orders 
    route.delete(
    "/:id",
    celebrate({
      params: validation.uuidParam,
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      try {
        let id = req.params.id as string;
        const OrderServiceInstance = Container.get(OrderService);
        const data = await OrderServiceInstance.Delete(id);

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
