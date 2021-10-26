"use strict";
// -> 미친짓을 못하도록 미연에 방지하기 위한 명령

// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  // console.log(window.scrollY);
  // console.log(`navbarHeight: ${navbarHeight}`);
  // -> 'navbar'의 height 값 확인하기

  if (window.scrollY >= navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});
// 스크롤이 될 때마다 내가 등록한 이 함수를 호출해라
// () =>, 'Arrow function' : 아무런 인자를 받지 않고 원하는 블럭을 실행
// `` : 백틱

// Avatar motion
var $wrap = $(".home__avatar"),
  lFollowX = 5,
  lFollowY = 10,
  x = 0,
  y = 0,
  friction = 1 / 12;

function animate() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;

  $wrap.css({
    transform:
      "translate(-50%, -50%) perspective(600px) rotateY(" +
      -x +
      "deg) rotateX(" +
      y +
      "deg)",
  });
  window.requestAnimationFrame(animate);
}

$(window).on("mousemove click", function (e) {
  var lMouseX = Math.max(
    -100,
    Math.min(100, $(window).width() / 2 - e.clientX)
  );
  var lMouseY = Math.max(
    -100,
    Math.min(100, $(window).height() / 2 - e.clientY)
  );
  lFollowX = (12 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 100;
});

animate();
