const body = document.querySelector("body");

const colors = [
  "#eebc12", // desktop
  "#904ead", // tablet
  "#2e8cd5", // mobile
];
const screens = {
  desktop: { id: 0, maxWidth: 1920, minWidth: 1281 },
  tablet: { id: 1, maxWidth: 1280, minWidth: 641 },
  mobile: { id: 2, maxWidth: 640, minWidth: 0 },
};

function setScreenColor(screenType) {
  body.style.backgroundColor = colors[screenType.id];
}

function setScreenType() {
  const screenWidth = window.innerWidth;

  if (
    screens.desktop.maxWidth >= screenWidth &&
    screens.desktop.minWidth < screenWidth
  ) {
    setScreenColor(screens.desktop);
  } else if (
    screens.tablet.maxWidth >= screenWidth &&
    screens.tablet.minWidth < screenWidth
  ) {
    setScreenColor(screens.tablet);
  } else {
    setScreenColor(screens.mobile);
  }
}

window.addEventListener("resize", setScreenType);

// first init.
setScreenType();
