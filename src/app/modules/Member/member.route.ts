import express from "express";
import { MemberController } from "./member.controller";

const route = express.Router();

route.post("/", MemberController.createMember);
route.get("/", MemberController.getMember);
route.get("/:id", MemberController.getMemberById);
route.patch("/:id", MemberController.updateMember);
route.delete("/:id", MemberController.deleteMember);

export const MemberRouter = route;
