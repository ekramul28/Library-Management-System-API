import prisma from "../shared/prisma";

const createBorrow = async (payload: any) => {
  const result = await prisma.borrowRecord.create({ data: payload });
  return result;
};
const returnBorrow = async (payload: any) => {
  const result = await prisma.borrowRecord.create({ data: payload });
  return result;
};

export const CreateAndBorrowService = {
  createBorrow,
  returnBorrow,
};
