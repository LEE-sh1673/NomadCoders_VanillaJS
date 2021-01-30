import { loadUserInfo, validSignPage } from "./login.js";
import { setUserName } from "./friends.js";
import "./status-bar.js";
import "./screen-header.js";
import "./chat.js";

const userInfo = loadUserInfo();

window.addEventListener("load", function () {
  const isSignPage = validSignPage();

  // if user information is alredy stored.
  if (userInfo) {
    if (!isSignPage) {
      // if current page is not sign up/in pages..
      setUserName(userInfo.username);
    } else {
      // if current page is sign up/in pages..
      window.location.replace("./friends.html");
    }
  } else if (!isSignPage) {
    // if current url is the page that are not show user before login..
    window.location.replace("./index.html");
  }
});
