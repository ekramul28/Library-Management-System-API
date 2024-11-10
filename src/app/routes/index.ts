import express from "express";
import { BookRouter } from "../modules/Book/book.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    router: BookRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
