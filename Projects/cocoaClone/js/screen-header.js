const screenHeader = document.querySelector(".screen-header");
const chatScreen = document.getElementById("chat-screen");

if (chatScreen !== null) {
  const chatStatusBar = chatScreen.querySelector(".status-bar");
  const chatHeader = chatScreen.querySelector(".alt-header");

  if (chatHeader !== null) {
    window.addEventListener("scroll", function () {
      const currentHeight = window.scrollY;

      if (currentHeight > 0) {
        chatStatusBar.classList.add("blur");
        chatHeader.classList.add("blur");
      } else {
        chatStatusBar.classList.remove("blur");
        chatHeader.classList.remove("blur");
      }
    });
  }
}

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
