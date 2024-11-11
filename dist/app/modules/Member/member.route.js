"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRouter = void 0;
const express_1 = __importDefault(require("express"));
const member_controller_1 = require("./member.controller");
const route = express_1.default.Router();
route.post("/", member_controller_1.MemberController.createMember);
route.get("/", member_controller_1.MemberController.getMember);
route.get("/:id", member_controller_1.MemberController.getMemberById);
route.put("/:id", member_controller_1.MemberController.updateMember);
route.delete("/:id", member_controller_1.MemberController.deleteMember);
exports.MemberRouter = route;
