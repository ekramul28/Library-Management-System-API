import express from "express";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    router: "UserRoute",
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
