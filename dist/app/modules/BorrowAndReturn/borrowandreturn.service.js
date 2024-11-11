"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAndBorrowService = void 0;
const prisma_1 = __importDefault(require("../shared/prisma"));
const createBorrow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.borrowRecord.create({ data: payload });
    return {
        borrowId: result.bookId,
        bookId: result.bookId,
        memberId: result.memberId,
        borrowDate: result.borrowDate,
    };
});
const returnBorrow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { borrowId } = payload;
    yield prisma_1.default.borrowRecord.findUniqueOrThrow({
        where: {
            id: borrowId,
        },
    });
    const result = yield prisma_1.default.borrowRecord.update({
        where: { id: borrowId },
        data: { returnDate: new Date() },
    });
    return result;
});
exports.CreateAndBorrowService = {
    createBorrow,
    returnBorrow,
};
