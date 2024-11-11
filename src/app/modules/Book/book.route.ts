import express from "express";

import { BookController } from "./book.controller";
const route = express.Router();

route.post("/", BookController.createBook);
route.get("/", BookController.getBook);
route.get("/:id", BookController.getBookById);
route.patch("/:id", BookController.updateBook);
route.delete("/:id", BookController.deleteBook);

export const BookRouter = route;
