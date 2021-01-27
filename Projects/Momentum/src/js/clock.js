const clockContainer = document.querySelector(".js-clock"),
  clockHours = clockContainer.querySelector(".clock__hours"),
  clockMinutes = clockContainer.querySelector(".clock__minutes"),
  clockSeconds = clockContainer.querySelector(".clock__seconds"),
  meridiem = clockContainer.querySelector(".clock__meridiem");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  let hours = date.getHours();
  
  meridiem.innerText = (hours >= 12) ? "PM" : "AM";
  hours = hours % 12;
  
  if (hours === 0) {
    hours = 12;
  }

  clockHours.innerText = `${hours < 10 ? `0${hours}` : hours}`;
  clockMinutes.innerText = `${minutes < 10 ? `0${minutes}` : minutes}`;
  clockSeconds.innerText = `${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  getTime(); // 현재 시간을 얻음.
  setInterval(getTime, 1000); // 얻은 시간을 갖고 시계 부분의 html 변형시킴 (매 1초마다 함수 호출)
}

init();
