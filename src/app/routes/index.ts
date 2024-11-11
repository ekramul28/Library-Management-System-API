import express from "express";
import { BookRouter } from "../modules/Book/book.route";
import { MemberRouter } from "../modules/Member/member.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/book",
    router: BookRouter,
  },
  {
    path: "/member",
    router: MemberRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
