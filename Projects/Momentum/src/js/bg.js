const body = document.querySelector("body");
const IMG_NUMBER = 3;

function handleImgLoad() {}

function PaintImage(imgNUmber) {
  const image = new Image();
  image.src = `./src/images/${imgNUmber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function genRandom(event) {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  PaintImage(randomNumber);
}

init();
