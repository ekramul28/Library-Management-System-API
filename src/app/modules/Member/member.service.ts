import { Member, Prisma } from "@prisma/client";
import calculatePagination from "../../helpars/paginationHelper";
import prisma from "../shared/prisma";
import { MemberSearchAbleFields } from "./member.constant";

const createMemberFromDb = async (payload: any) => {
  const result = await prisma.member.create({ data: payload });
  return result;
};

const getMemberFromDB = async (params: any, options: any) => {
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
  const andCondition: Prisma.MemberWhereInput[] = [];
  if (params.searchTerm) {
    andCondition.push({
      OR: MemberSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditions: Prisma.MemberWhereInput = { AND: andCondition };
  const result = await prisma.member.findMany({
    where: whereConditions,
    skip,
    take: limit,
  });
  const total = await prisma.member.count({
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

const getMemberByIdFromDB = async (id: string): Promise<Member | null> => {
  const result = await prisma.member.findUnique({
    where: {
      memberId: id,
    },
  });
  return result;
};

const updateMemberFromDB = async (
  id: string,
  data: Partial<Member>
): Promise<Member> => {
  await prisma.member.findUniqueOrThrow({
    where: {
      memberId: id,
    },
  });
  const result = await prisma.member.update({
    where: {
      memberId: id,
    },
    data,
  });
  return result;
};

const deleteMemberFromDB = async (id: string): Promise<Member | null> => {
  const result = await prisma.member.findFirstOrThrow({
    where: {
      memberId: id,
    },
  });

  await prisma.member.delete({
    where: {
      memberId: id,
    },
  });

  return result;
};

export const MemberService = {
  createMemberFromDb,
  getMemberFromDB,
  getMemberByIdFromDB,
  updateMemberFromDB,
  deleteMemberFromDB,
};
