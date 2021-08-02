import banners from "./carouselData.js";

const courseContainer = document.querySelector(".course-container");
const slideWrapper = document.querySelector(".slide-wrapper");
const loader = document.querySelector(".loader");

const firstButton = document.querySelector(".first-btn");
const secondButton = document.querySelector(".second-btn");
const thirdButton = document.querySelector(".third-btn");
const fourthButton = document.querySelector(".fourth-btn");

const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector(".search-box");
const autoBox = document.querySelector(".auto-box");

// API
let count = 3;
const courseAPI = "courses";
let apiURL = `http://localhost:3000/api/${courseAPI}?count=${count}`;
let searchApiURL = `http://localhost:3000/api/${courseAPI}?count=400`;

// states
let ready = false;
let coursesLoaded = 0;
let totalCourses = 0;
let lectureArray = [];

// 인풋 박스 체크
inputBox.onkeyup = (e) => {
  let userData = e.target.value; // user entered data
  let emptyArray = [];
  if (userData) {
    emptyArray = lectureArray.filter((data) => {
      return data;
    });
    console.log(emptyArray);

    emptyArray = emptyArray.map((data) => {
      return (data = `<li>${data}</li>`);
    });
    console.log(emptyArray);
  }
};

// 전체 코스 로딩 됐는지 확인
function courseLoaded() {
  // courseLoaded가 totalCourses와 같을 때 더 보여주세요

  count = count + 3;
  apiURL = `http://localhost:3000/api/${courseAPI}?count=${count}`;
  console.log(apiURL);
}

function displayCourses() {
  // console.log(lectureArray.length); // 3

  lectureArray.forEach((course) => {
    const { id, title, coverImageUrl, instructorName, price } = course;

    // course-card-wrapper
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");

    // course-image-wrapper
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("course-image");

    // course-image => <a> link
    const anchorImage = document.createElement("a");
    anchorImage.href = coverImageUrl;
    anchorImage.target = "_blank";

    // course-image
    const image = document.createElement("img");
    image.classList.add("course-card-image");
    image.src = coverImageUrl;
    image.loading = "lazy";

    // course-description-wrapper
    const courseDesc = document.createElement("div");
    courseDesc.classList.add("course-description");

    // course-description
    const courseTitle = document.createElement("h3");
    courseTitle.classList.add("course-title");
    courseTitle.textContent = title;

    const courseInstructor = document.createElement("p");
    courseInstructor.classList.add("course-instructor");
    courseInstructor.textContent = instructorName;

    const coursePrice = document.createElement("strong");
    coursePrice.classList.add("course-price");
    coursePrice.innerHTML = `${price}원`;

    // Append
    anchorImage.append(image, courseDesc, courseTitle);
    courseCard.append(anchorImage, imageWrapper, courseInstructor, coursePrice);

    courseContainer.appendChild(courseCard);

    // 끝나면 이미지 카드 더 보여주셈
    courseContainer.addEventListener("load", courseLoaded);
  });
}

function updateDOM(pageReslt) {
  courseContainer.textContent = "";
  displayCourses(pageReslt);
  courseLoaded(pageReslt);
}

function updateInputDOM() {
  lectureArray.forEach((course) => {
    // console.log(course);
    const { title } = course;

    // li input tag
    const searchLists = document.createElement("li");
    searchLists.classList.add("search-lists");
    searchLists.innerText = title;

    autoBox.append(searchLists);
  });
}

// carousel 캐러셀 배너

firstButton.addEventListener("click", function () {
  slideWrapper.style.transform = "translate(0vw)";
});

secondButton.addEventListener("click", function () {
  slideWrapper.style.transform = "translate(-100vw)";
});

thirdButton.addEventListener("click", function () {
  slideWrapper.style.transform = "translate(-200vw)";
});

fourthButton.addEventListener("click", function () {
  slideWrapper.style.transform = "translate(-300vw)";
});

console.log("배너(신경x)", banners);

//////////////////// API fetching => 3개 기본
async function getLectures() {
  // show loading icon...
  loader.classList.remove("hidden");
  try {
    const response = await fetch(apiURL);
    const jsonResult = await response.json();
    lectureArray = await jsonResult.data.courses;
    // console.log(lectureArray);
    updateDOM("results");
    console.log("처음 나오는 데이터 3개", jsonResult.data.courses);
  } catch (err) {
    console.log(err);
  }
}

async function getSearchLists() {
  try {
    const response = await fetch(searchApiURL);
    const jsonResult = await response.json();
    lectureArray = await jsonResult.data.courses;
    console.log(lectureArray);
    updateInputDOM();
  } catch (err) {
    console.log(err);
  }
}

// scroll check
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    lectureArray.length < 401
  ) {
    console.log(count);
    console.log(apiURL);
    // console.log("window.innerHeight", window.innerHeight);
    // console.log("window.scrollY", window.scrollY);
    // console.log("document.body.offsetHeight", document.body.offsetHeight);

    console.log("더 보여주세용~!");
    getLectures();
  }
});

// execute
getLectures();
getSearchLists();
