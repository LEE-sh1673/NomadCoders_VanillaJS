const colors = ["red", "orange", "blue", "green"];
const title = document.querySelector("h2");

const superEvnetHandler = {
  handleEnter: function () {
    title.innerText = "Mouse is here!";
    title.style.color = colors[0];
  },
  handleLeave: function () {
    title.innerText = "Mouse is gone!";
    title.style.color = colors[1];
  },
  handleResize: function () {
    title.innerText = "You just resized!";
    title.style.color = colors[2];
  },
  handleContext: function () {
    title.innerText = "That was a right click!";
    title.style.color = colors[3];
  },
};

title.addEventListener("mouseenter", superEvnetHandler.handleEnter);
title.addEventListener("mouseleave", superEvnetHandler.handleLeave);
window.addEventListener("resize", superEvnetHandler.handleResize);
window.addEventListener("contextmenu", superEvnetHandler.handleContext);
