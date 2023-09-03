import express from "express";
import morgan from "morgan";
import cors from "cors";
import { trackingPlanRouter } from "./routes/trackingplan.route";
import { errorResponder } from "./middleware/error.middleware";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.json())
    .use(cors())
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    })
    .use("/trackingplans", trackingPlanRouter)
    .use(errorResponder);

  return app;
};
