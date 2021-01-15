const clock = document.getElementById("status-bar__clock");

function padDigits(digit) {
  return `00${digit}`.slice(-2);
}

function updateTime() {
  const today = new Date();
  clock.innerText = `${padDigits(today.getHours())}:${padDigits(
    today.getMinutes()
  )}`;
}

// update per 1sec.
setInterval(function () {
  updateTime();
}, 1000);

// immediate run this code.
(function () {
  updateTime();
})();
