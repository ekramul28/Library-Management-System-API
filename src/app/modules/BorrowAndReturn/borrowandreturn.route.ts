import express from "express";
import { BorrowAndReturnController } from "./borrowandreturn.controller";

const route = express.Router();

route.post("/", BorrowAndReturnController.createBorrow);
route.post("/return", BorrowAndReturnController.returnBorrow);

export const BorrowRouter = route;
