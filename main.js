"use strict";
// -> 미친짓을 못하도록 미연에 방지하기 위한 명령

window.onload = function () {
  // Make navbar transparent when it is on the top
  const navbar = document.querySelector("#navbar");
  const navbarHeight = navbar.getBoundingClientRect().height;

  document.addEventListener("scroll", () => {
    if (window.scrollY >= navbarHeight) {
      navbar.classList.add("navbar--dark");
    } else {
      navbar.classList.remove("navbar--dark");
    }
  });
  // 스크롤이 될 때마다 내가 등록한 이 함수를 호출해라
  // () =>, 'Arrow function' : 아무런 인자를 받지 않고 원하는 블럭을 실행
  // `` : 백틱

  // console.log(window.scrollY);
  // console.log(`navbarHeight: ${navbarHeight}`);
  // -> 'navbar'의 height 값 확인하기

  // Handle scrolling when tapping on the navbar menu
  const navbarMenu = document.querySelector(".navbar__menu");
  navbarMenu.addEventListener("click", (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
      return;
    }

    console.log(event.target.dataset.link);

    // Javascript scroll to id
    const scrollTo = document.querySelector(link);
    scrollTo.scrollIntoView({ behavior: "smooth" });
  });
};
