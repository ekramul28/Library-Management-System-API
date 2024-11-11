import { Request, Response } from "express";
import catchAsync from "../../middlewares/catchAsync";
import sendResponse from "../shared/sendResponse";
import { CreateAndBorrowService } from "./borrowandreturn.service";

const createBorrow = catchAsync(async (req: Request, res: Response) => {
  const result = await CreateAndBorrowService.createBorrow(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book borrowed successfully",
    data: result,
  });
});
const returnBorrow = catchAsync(async (req: Request, res: Response) => {
  await CreateAndBorrowService.returnBorrow(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book returned successfully",
    data: null,
  });
});

export const BorrowAndReturnController = {
  createBorrow,
  returnBorrow,
};
