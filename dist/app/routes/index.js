"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = require("../modules/Book/book.route");
const member_route_1 = require("../modules/Member/member.route");
const borrowandreturn_route_1 = require("../modules/BorrowAndReturn/borrowandreturn.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/books",
        router: book_route_1.BookRouter,
    },
    {
        path: "/members",
        router: member_route_1.MemberRouter,
    },
    {
        path: "/borrow",
        router: borrowandreturn_route_1.BorrowRouter,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.router));
exports.default = router;
