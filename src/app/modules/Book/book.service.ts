import { Book, Prisma } from "@prisma/client";
import calculatePagination from "../../helpars/paginationHelper";
import prisma from "../shared/prisma";
import { BookSearchAbleFields } from "./book.constant";

const createBookFromDb = async (payload: any) => {
  const result = await prisma.book.create({ data: payload });
  return result;
};

const getBookFromDB = async (params: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  if (Object.keys(filterData).length > 0) {
    AND: Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));
  }

  console.log(params);
  const andCondition: Prisma.BookWhereInput[] = [];
  if (params.searchTerm) {
    andCondition.push({
      OR: BookSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  andCondition.push({ isDeleted: false });

  const whereConditions: Prisma.BookWhereInput = { AND: andCondition };
  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getBookByIdFromDB = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      bookId: id,
      isDeleted: false,
    },
  });
  return result;
};

const updateBookFromDB = async (
  id: string,
  data: Partial<Book>
): Promise<Book> => {
  await prisma.book.findUniqueOrThrow({
    where: {
      bookId: id,
      isDeleted: false,
    },
  });
  const result = await prisma.book.update({
    where: {
      bookId: id,
    },
    data,
  });
  return result;
};

const deleteBookFromDB = async (id: string): Promise<Book | null> => {
  const bookData = await prisma.book.findUniqueOrThrow({
    where: {
      bookId: id,
    },
  });

  const borrowRecords = await prisma.borrowRecord.findMany({
    where: {
      bookId: bookData.bookId,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    // Delete BorrowRecords first, if they exist
    if (borrowRecords.length > 0) {
      await transactionClient.borrowRecord.deleteMany({
        where: {
          bookId: id,
        },
      });
    }

    // Then delete the book
    const bookDeletedData = await transactionClient.book.delete({
      where: {
        bookId: id,
      },
    });

    return bookDeletedData;
  });

  return result;
};

export const BookService = {
  createBookFromDb,
  getBookFromDB,
  getBookByIdFromDB,
  updateBookFromDB,
  deleteBookFromDB,
};
