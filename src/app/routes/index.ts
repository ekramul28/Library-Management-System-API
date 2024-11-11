import express from "express";
import { BookRouter } from "../modules/Book/book.route";
import { MemberRouter } from "../modules/Member/member.route";
import { BorrowRouter } from "../modules/BorrowAndReturn/borrowandreturn.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/books",
    router: BookRouter,
  },
  {
    path: "/members",
    router: MemberRouter,
  },
  {
    path: "/borrow",
    router: BorrowRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
