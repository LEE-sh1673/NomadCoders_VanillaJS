import {
  USER_INFO,
  loginForm,
  handleFormKeyPress,
  handleFormSubmit,
} from "./login.js";
import "./status-bar.js";

window.addEventListener("load", () => {
  if (loginForm) {
    if (USER_INFO) {
      // if user info already saved on local storage, then move immediately.
      window.location.replace("./friends.html");
    }
    // if not, then add event listenter to register user info manipulations.
    loginForm.addEventListener("keypress", handleFormKeyPress);
    loginForm.addEventListener("submit", handleFormSubmit);
  }
});
