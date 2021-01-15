import { loadUserInfo, saveUserInfo } from "./login.js";

const USER_INFO = loadUserInfo();
const loginForm = document.querySelector(".login-form");

function handleFormKeyPress(event) {
  if (event.key === "Enter") {
    const username = event.target.form[0].value;
    const password = event.target.form[1].value;
    saveUserInfo(username, password);
    window.location.replace("./friends.html");
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const username = event.target[0].value;
  const password = event.target[1].value;
  saveUserInfo(username, password);
  window.location.replace("./friends.html");
}

window.addEventListener("load", () => {
  if (USER_INFO) {
    window.location.replace("./friends.html");
  }
});

loginForm.addEventListener("keypress", handleFormKeyPress);
loginForm.addEventListener("submit", handleFormSubmit);
