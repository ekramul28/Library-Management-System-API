import { NextFunction, Request, RequestHandler, Response } from "express";
import pick from "../shared/pick";
import sendResponse from "../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";
import { BookFilterableFields } from "./book.constant";
import { BookService } from "./book.service";

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookService.createBookFromDb(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book created successfully",
      data: result,
    });
  }
);
const getBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, BookFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    console.log("this is option", options);
    const result = await BookService.getBookFromDB(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Books retrieved successfully",
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
    message: "Book retrieved successfully",
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookService.updateBookFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully ",
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await BookService.deleteBookFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book successfully deleted",
    data: null,
  });
});

export const BookController = {
  createBook,
  getBook,
  getBookById,
  updateBook,
  deleteBook,
};
