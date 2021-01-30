const chatScreen = document.querySelector(".main-chat");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

if (chatScreen !== null) {
  const chatForm = document.querySelector(".reply"),
    chatInput = chatForm.querySelector("input");

  function getTimeStamp() {
    const now = new Date();

    const year = now.getFullYear();
    const month = months[now.getMonth()];
    const date = now.getDate();
    const day = daysWeek[now.getDay()];

    return [day, month + " " + date, year].join(", ");
  }

  function getCurrentTime() {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();

    return [
      (hours < 10 ? "0" : "") + hours,
      (minutes < 10 ? "0" : "") + minutes,
    ].join(":");
  }

  function createChatMessage(chatTextContent) {
    const msgRow = document.createElement("div");
    const msgRowContent = document.createElement("div");
    const mgsTextContent = document.createElement("div");
    const bubble = document.createElement("span");
    const timestamp = document.createElement("span");

    msgRow.classList.add("message-row", "message-row--own");
    msgRowContent.classList.add("message-row__content");
    mgsTextContent.classList.add("message__messageContent");
    bubble.classList.add("messageContent__bubble");
    timestamp.classList.add("messageContent__time");

    bubble.innerText = chatTextContent;
    timestamp.innerText = getCurrentTime();

    mgsTextContent.append(bubble, timestamp);
    msgRowContent.append(mgsTextContent);
    msgRow.append(msgRowContent);
    chatScreen.append(msgRow);
  }

  chatForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let chatTextContent = chatInput.value;

    if (chatTextContent[0] === ">") {
      chatTextContent = chatTextContent.substring(1);
    }
    createChatMessage(chatTextContent);
    chatInput.value = "";
  });

  window.addEventListener("load", function () {
    const timeStamp = document.createElement("div");
    const text = document.createElement("span");

    timeStamp.classList.add("chat__timestamp");
    text.innerText = getTimeStamp();

    timeStamp.append(text);
    chatScreen.append(timeStamp);
  });
}
