import { Request, RequestHandler, Response } from "express";
import pick from "../shared/pick";
import sendResponse from "../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";
import { MemberFilterableFields } from "./member.constant";
import { MemberService } from "./member.service";

const createMember = catchAsync(async (req: Request, res: Response) => {
  const result = await MemberService.createMemberFromDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member create successfully",
    data: result,
  });
});

const getMember: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, MemberFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    console.log("this is option", options);
    const result = await MemberService.getMemberFromDB(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Members retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);
const getMemberById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MemberService.getMemberByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member retrieved successfully",
    data: result,
  });
});

const updateMember = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await MemberService.updateMemberFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member updated successfully ",
    data: result,
  });
});
const deleteMember = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await MemberService.deleteMemberFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member successfully deleted",
    data: null,
  });
});

export const MemberController = {
  createMember,
  getMember,
  getMemberById,
  updateMember,
  deleteMember,
};
