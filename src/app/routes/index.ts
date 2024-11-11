import express from "express";
import { BookRouter } from "../modules/Book/book.route";
import { MemberRouter } from "../modules/Member/member.route";
import { BorrowRouter } from "../modules/BorrowAndReturn/borrowandreturn.route";

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
  {
    path: "/member",
    router: BorrowRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
