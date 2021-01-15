const USERNAME = "currentUsername";
const PASSWORD = "currentPassword";

export const USER_INFO = loadUserInfo();
export const loginForm = document.querySelector(".login-form");

function loadUserInfo() {
  const username = localStorage.getItem(USERNAME);
  const password = localStorage.getItem(PASSWORD);

  if (username === null && password === null) {
    return null;
  } else {
    return { username, password };
  }
}

function saveUserInfo(username, password) {
  localStorage.setItem(USERNAME, username);
  localStorage.setItem(PASSWORD, password);
}

export function handleFormKeyPress(event) {
  if (event.key === "Enter") {
    const username = event.target.form[0].value;
    const password = event.target.form[1].value;
    saveUserInfo(username, password);
    window.location.replace("./friends.html");
  }
}

export function handleFormSubmit(event) {
  event.preventDefault();
  const username = event.target[0].value;
  const password = event.target[1].value;
  saveUserInfo(username, password);
  window.location.replace("./friends.html");
}
