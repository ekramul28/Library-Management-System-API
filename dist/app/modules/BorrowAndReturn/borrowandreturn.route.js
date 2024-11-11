"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrowandreturn_controller_1 = require("./borrowandreturn.controller");
const route = express_1.default.Router();
route.post("/", borrowandreturn_controller_1.BorrowAndReturnController.createBorrow);
route.post("/return", borrowandreturn_controller_1.BorrowAndReturnController.returnBorrow);
exports.BorrowRouter = route;
