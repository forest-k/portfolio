"use strict";
// -> 미친짓을 못하도록 미연에 방지하기 위한 명령

// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});
// ----------------------------------------------------------------------
// 스크롤이 될 때마다 내가 등록한 이 함수를 호출해라
// () =>, 'Arrow function' : 아무런 인자를 받지 않고 원하는 블럭을 실행
// `` : 백틱

// console.log(window.scrollY);
// console.log(`navbarHeight: ${navbarHeight}`);
// -> 'navbar'의 height 값 확인하기
// ----------------------------------------------------------------------

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }

  // Javascript scroll to id
  scrollIntoView(link);
});

// Handle click on 'contact me' button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;

adjustOpacity(home);

function adjustOpacity(element) {
  document.addEventListener("scroll", () => {
    home.style.opacity = 2 - window.scrollY / homeHeight;
  });
}

// Handle click on th "arrow up" button
const arrowTop = document.querySelector(".arrow-up");
arrowTop.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Show "arrow up" button when scrolling down
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowTop.classList.add("visible");
  } else {
    arrowTop.classList.remove("visible");
  }

  navbarMenu.classList.remove("open");
  navbarBtnOn.classList.remove("on");
  navbarBtnOff.classList.remove("off");
});

// Navbar Toggle button for small screen
// Change icon when tapping on the navbar Toogle button
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
const navbarBtnOn = document.querySelector(
  ".navbar__toggle-btn > .fa-times-circle"
);
const navbarBtnOff = document.querySelector(".navbar__toggle-btn > .fa-bars");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
  navbarBtnOn.classList.toggle("on");
  navbarBtnOff.classList.toggle("off");
});

// project
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // Remove selection from the previous item and select the new one
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");

  setTimeout(() => {
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 200);
});

// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다
// 2. IntersectionObserver을 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#animations",
  "#contact",
];

// 1. 모든 section 요소들, 메뉴 아이템들을 가져오기
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

window.addEventListener("load", () => {
  selectNavItem(navItems[selectedNavIndex]);
});

function selectNavItem(selected) {
  selectedNavItem.classList.remove("select");
  selectedNavItem = selected; //navItems[selectedNavIndex];
  selectedNavItem.classList.add("select");
}

// 2. IntersectionObserver
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`); //'indexOf' API

      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("scroll", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.scrollHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
