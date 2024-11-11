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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
const paginationHelper_1 = __importDefault(require("../../helpars/paginationHelper"));
const prisma_1 = __importDefault(require("../shared/prisma"));
const member_constant_1 = require("./member.constant");
const createMemberFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.create({ data: payload });
    return result;
});
const getMemberFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.default)(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    if (Object.keys(filterData).length > 0) {
        AND: Object.keys(filterData).map((key) => ({
            [key]: {
                equals: filterData[key],
            },
        }));
    }
    console.log(params);
    const andCondition = [];
    if (params.searchTerm) {
        andCondition.push({
            OR: member_constant_1.MemberSearchAbleFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    const whereConditions = { AND: andCondition };
    const result = yield prisma_1.default.member.findMany({
        where: whereConditions,
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.member.count({
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
});
const getMemberByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.findUnique({
        where: {
            memberId: id,
        },
    });
    return result;
});
const updateMemberFromDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.member.findUniqueOrThrow({
        where: {
            memberId: id,
        },
    });
    const result = yield prisma_1.default.member.update({
        where: {
            memberId: id,
        },
        data,
    });
    return result;
});
const deleteMemberFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.findFirstOrThrow({
        where: {
            memberId: id,
        },
    });
    yield prisma_1.default.member.delete({
        where: {
            memberId: id,
        },
    });
    return result;
});
exports.MemberService = {
    createMemberFromDb,
    getMemberFromDB,
    getMemberByIdFromDB,
    updateMemberFromDB,
    deleteMemberFromDB,
};
