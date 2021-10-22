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
o;
