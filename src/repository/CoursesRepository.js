"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.searchOnCourse = void 0;
const courses_1 = require("../data/courses");
function* searchGen(arr, keyword) {
  const reg = typeof keyword === "string" ? new RegExp(keyword) : keyword;
  for (const course of arr) {
    if (reg.test(course.title)) {
      if (yield course) {
        break;
      }
    }
  }
}
function searchOnCourse(arr, keyword, count) {
  const iter = searchGen(arr, keyword);
  let curr = iter.next();
  const result = [];
  let currCount = 1;
  while (!curr.done) {
    result.push(curr.value);
    curr = iter.next(currCount === count);
    currCount++;
  }
  return result;
}
exports.searchOnCourse = searchOnCourse;
class CoursesRepository {
  constructor() {}
  list({ page = 1, count = 20, lastContentId, search: _search }) {
    const search = _search !== undefined ? _search.trim() : "";
    const courses =
      search.length > 0
        ? searchOnCourse(courses_1.courses, search, page * count)
        : courses_1.courses;
    const indexOfLastContent =
      lastContentId !== undefined && lastContentId > -1
        ? courses.findIndex(({ id }) => id === lastContentId) + 1
        : (page - 1) * count;
    // const filteredCourses =
    const result = courses.slice(
      indexOfLastContent,
      indexOfLastContent + count
    );
    return new Promise((resolve) => {
      resolve(result);
    });
  }
  getById(id) {
    return new Promise((resolve) => {
      const course =
        courses_1.courses.find(({ id: courseId }) => courseId === id) || null;
      resolve(course);
    });
  }
}
exports.default = CoursesRepository;
