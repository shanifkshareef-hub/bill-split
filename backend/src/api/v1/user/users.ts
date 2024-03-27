import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { Logger } from "winston";
import { Container } from "typedi";
import passport from "passport";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  // Get my details
  route.get(
    "/me",
    passport.authenticate("jwt", { session: false }),
    async (_req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      try {
        // let { id } = req.user;
        // const userServiceInstance = Container.get(UserService);
        // // const data = await userServiceInstance.GetProfile(id);

        return res.json({
          status: true,
          data: [],
        });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  // Update a user
  route.patch(
    "/:id",
    celebrate({
      body: Joi.object({
        first_name: Joi.string().required().normalize(),
        middle_name: Joi.string().normalize().allow("").optional(),
        last_name: Joi.string().normalize().allow("").optional(),
        about: Joi.string().normalize().allow("").optional(),
      }),
    }),
    passport.authenticate("jwt", { session: false }),
    async (_: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      try {
        // let { id } = req.user;
        // let user: UserUpdateDTO = req.body;
        // const userServiceInstance = Container.get(UserService);
        // const updated = await userServiceInstance.UpdateUser(id, user);

        return res.json({
          status: true,
          data: [],
        });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );
};
