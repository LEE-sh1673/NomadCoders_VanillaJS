// Static keys for local storage.
const USERNAME = "currentUsername";
const PASSWORD = "currentPassword";

// DOM elements
const walkThroughs = document.querySelector(".welcome-tutorial-slider");
const walkThroughs__btn = document.querySelector(".tutorial-slider__btn");
const loginForm = document.querySelector(".login-form");

// Flag for switch walkthough.
let isFirst = true;

// save user information to local storage.
function saveUserInfo(username, password) {
  sessionStorage.setItem(USERNAME, username);
  sessionStorage.setItem(PASSWORD, password);
}

// If all of the register process is done, then showing walkthrough before we move on.
// function displayWalkThroughs() {
//   if (isFirst) {
//     walkThroughs.style.opacity = "1";
//     walkThroughs.style.zIndex = "1";
//     isFirst = false;
//   }
// }

if (loginForm) {
  // save current user information and move to friends page.
  function handleFormKeyPress(event) {
    if (event.key === "Enter") {
      const username = event.target.form[0].value;
      const password = event.target.form[1].value;
      saveUserInfo(username, password);
      // displayWalkThroughs();
      isFirst = false;
      window.location.replace("./friends.html");
    }
  }

  // save current user information and move to friends page.
  function handleFormSubmit(event) {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    saveUserInfo(username, password);
    displayWalkThroughs();
  }

  // Add event listenter to register user info manipulations.
  loginForm.addEventListener("keypress", handleFormKeyPress);
  loginForm.addEventListener("submit", handleFormSubmit);
}

// If current walkthourh page is activated, then add event listener to go on next page.
// if (walkThroughs__btn) {
//   walkThroughs__btn.addEventListener("click", (e) => {
//     e.preventDefault();
//     window.location.replace("./friends.html");
//   });
// }

// load user information from local storage.
export function loadUserInfo() {
  const username = sessionStorage.getItem(USERNAME);
  const password = sessionStorage.getItem(PASSWORD);

  if (username === null && password === null) {
    return null;
  } else {
    return { username, password };
  }
}

export function validSignPage() {
  return loginForm !== null;
}
