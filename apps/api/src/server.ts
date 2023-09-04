import express from "express";
import morgan from "morgan";
import cors from "cors";
import { trackingPlanRouter } from "./routes/trackingplan.route";
import { errorResponder } from "./middleware/error.middleware";
import { eventRouter } from "./routes/event.route";
const expressOasGenerator = require("express-oas-generator");
export const createServer = () => {
  const app = express();
  expressOasGenerator.init(
    app,
    function (spec: any) {
      return spec;
    },
    "./specs.json",
    60 * 1000,
    "api-docs",
    [],
    [],
    ["production"]
  );
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.json())
    .use(cors())
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    })
    .use("/trackingplans", trackingPlanRouter)
    .use("/events", eventRouter)
    .use(errorResponder);

  return app;
};
