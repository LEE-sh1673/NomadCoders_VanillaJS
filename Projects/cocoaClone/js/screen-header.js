const screenHeader = document.querySelector(".screen-header");

if (screenHeader !== null) {
  window.addEventListener("scroll", function () {
    const currentHeight = window.scrollY;

    if (currentHeight > 0) {
      screenHeader.classList.add("shadow");
    } else {
      screenHeader.classList.remove("shadow");
    }
  });
}
