import prisma from "../shared/prisma";
type BorrowPayload = {
  bookId: string;
  memberId: string;
};

type ReturnPayload = {
  borrowId: string;
  returnDate: Date;
};

const createBorrow = async (payload: BorrowPayload) => {
  const result = await prisma.borrowRecord.create({ data: payload });
  return {
    borrowId: result.bookId,
    bookId: result.bookId,
    memberId: result.memberId,
    borrowDate: result.borrowDate,
  };
};
const returnBorrow = async (payload: ReturnPayload) => {
  const { borrowId } = payload;
  await prisma.borrowRecord.findUniqueOrThrow({
    where: {
      id: borrowId,
    },
  });

  const result = await prisma.borrowRecord.update({
    where: { id: borrowId },
    data: { returnDate: new Date() },
  });

  return result;
};

export const CreateAndBorrowService = {
  createBorrow,
  returnBorrow,
};
