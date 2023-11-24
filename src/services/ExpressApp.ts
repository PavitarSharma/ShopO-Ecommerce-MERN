import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import {
  AdminRoutes,
  AuthRoutes,
  UserRoutes,
  VendorRoutes,
  bannerRoutes,
  categoryRoutes,
} from "../routes";
import createHttpError from "http-errors";

export default async (app: Application) => {
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://shopo-ecommerce.netlify.app",
        "*",
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
  );

  app.use("/", express.static(path.join(__dirname, "../../uploads")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(helmet());
  app.use(morgan("dev"));

  app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "Hello from the shopo ecommerce backend",
    });
  });

  app.use("/auth", AuthRoutes);
  app.use("/user", UserRoutes);
  app.use("/admin", AdminRoutes);
  app.use("/vendor", VendorRoutes);
  app.use("/category", categoryRoutes);
  app.use("/banner", bannerRoutes);

  app.use("*", async (req: Request, res: Response, next: NextFunction) => {
    next(createHttpError.NotFound());
  });

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      status: err.status || 500,
      message: err.message,
    });
  };

  app.use(errorHandler);

  return app;
};
