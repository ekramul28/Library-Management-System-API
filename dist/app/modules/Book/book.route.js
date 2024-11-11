"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const route = express_1.default.Router();
route.post("/", book_controller_1.BookController.createBook);
route.get("/", book_controller_1.BookController.getBook);
route.get("/:id", book_controller_1.BookController.getBookById);
route.put("/:id", book_controller_1.BookController.updateBook);
route.delete("/:id", book_controller_1.BookController.deleteBook);
exports.BookRouter = route;
