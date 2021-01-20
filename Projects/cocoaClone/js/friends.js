const currentUserName = document.getElementById("username");

export function setUserName(username) {
  currentUserName.innerText = username;
}
