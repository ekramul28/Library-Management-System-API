import { NextFunction, Request, RequestHandler, Response } from "express";
import pick from "../shared/pick";
import sendResponse from "../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";
import { BookFilterableFields } from "./book.constant";
import { BookService } from "./book.service";

const getBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, BookFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    console.log("this is option", options);
    const result = await BookService.getBookFromDB(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data fetched",
      meta: result.meta,
      data: result.data,
    });
  }
);
const getBookById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getBookByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data fetched",
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookService.updateBookFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated Successful ",
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookService.deleteBookFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete Successful",
    data: result,
  });
});

export const BookController = {
  getBook,
  getBookById,
  updateBook,
  deleteBook,
};
