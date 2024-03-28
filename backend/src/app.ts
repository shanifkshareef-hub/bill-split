import "reflect-metadata";

import express from "express";
import config from "./config";
import Logger from "./loaders/logger";

let app = express();

(async () => {
  await require("./loaders").default(app);

  app
    .listen(config.port ?? 8000, () => {
      Logger.info(`🛡️ Server listening on port: ${config.port ?? 8000} 🛡️`);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });

  process.on("unhandledRejection", function (reason, p) {
    Logger.warn(
      "Possibly Unhandled Rejection at: Promise ",
      p,
      " reason: ",
      reason
    );
  });
})();

export default app;
