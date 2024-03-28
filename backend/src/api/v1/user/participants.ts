import { Router, Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import { Container } from "typedi";
import validation from "../../../middlewares/validation";
import ParticipantService from "../../../services/participants";

const route = Router();

export default (app: Router) => {
  app.use("/participants", route);

  // Get all participants
  route.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get("logger");
    try {
      const ParticipantServiceInstance = Container.get(ParticipantService);
      const data = await ParticipantServiceInstance.List();

      return res.json({
        status: true,
        data,
      });
    } catch (e) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });

  // Create an participants
  route.post(
    "/",
    validation.participantCreateSchema,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      try {
        const ParticipantServiceInstance = Container.get(ParticipantService);
        const data = await ParticipantServiceInstance.Create(req.body);

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

  // Update an participants
  route.put(
    "/:id",
    validation.participantUpdateSchema,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      try {
        let id = req.params.id as string;
        const ParticipantServiceInstance = Container.get(ParticipantService);
        const data = await ParticipantServiceInstance.Update(id, req.body);

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

  // Delete an participants
  route.delete(
    "/:id",
    validation.uuidParam,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      try {
        let id = req.params.id as string;
        const ParticipantServiceInstance = Container.get(ParticipantService);
        const data = await ParticipantServiceInstance.Delete(id);

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
