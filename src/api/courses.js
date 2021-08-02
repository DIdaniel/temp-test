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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const queryString_1 = require("../util/queryString");
const router = express_1.default.Router();
exports.router = router;
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { query: { page: qPage, count: qCount, lastContentId: qLastContentId, search: qSearch, }, } = req;
    const page = queryString_1.isSingleQueryString(qPage) ? parseInt(qPage || "1") : 1;
    const count = queryString_1.isSingleQueryString(qCount) ? parseInt(qCount || "20") : 20;
    const lastContentId = queryString_1.isSingleQueryString(qLastContentId)
        ? qLastContentId !== undefined
            ? parseInt(qLastContentId)
            : undefined
        : undefined;
    const search = queryString_1.isSingleQueryString(qSearch) ? qSearch : undefined;
    let courses;
    try {
        courses = yield ((_a = Container.get("CourseService")) === null || _a === void 0 ? void 0 : _a.getCourseList({ page, count, lastContentId, search }));
    }
    catch (error) {
        console.error("/courses error 발생!", error);
    }
    if (courses) {
        res.json({
            ok: true,
            data: {
                courses,
            },
        });
    }
    else {
        res.json({
            ok: false,
            error: {
                message: "강의 리스트를 가져오는데 실패했습니다.",
            },
        });
    }
}));
router.get("/:courseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { params: { courseId }, } = req;
    let course = null;
    try {
        course = yield ((_b = Container.get("CourseService")) === null || _b === void 0 ? void 0 : _b.getCourse(parseInt(courseId)));
    }
    catch (error) {
        console.error("/courses error 발생!", error);
    }
    if (course) {
        res.json({
            ok: true,
            data: {
                course,
            },
        });
    }
    else {
        res.json({
            ok: false,
            error: {
                message: "강의 상세를 가져오는데 실패했습니다.",
            },
        });
    }
}));
