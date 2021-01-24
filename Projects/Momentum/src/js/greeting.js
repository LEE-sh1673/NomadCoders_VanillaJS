const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_ON = "showing";

function SaveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  PaintGreeting(currentValue);
  SaveName(currentValue);
}

function AskForName() {
  form.classList.add(SHOWING_ON);
  form.addEventListener("submit", handleSubmit);
}

function PaintGreeting(text) {
  form.classList.remove(SHOWING_ON);
  greeting.classList.add(SHOWING_ON);
  greeting.innerText = `Hello ${text}.`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    AskForName();
  } else {
    PaintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
