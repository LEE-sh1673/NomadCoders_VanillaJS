const USERNAME = "currentUsername";
const PASSWORD = "currentPassword";

export function loadUserInfo() {
  const username = localStorage.getItem(USERNAME);
  const password = localStorage.getItem(PASSWORD);

  if (username === null && password === null) {
    return null;
  } else {
    return { username, password };
  }
}

export function saveUserInfo(username, password) {
  localStorage.setItem(USERNAME, username);
  localStorage.setItem(PASSWORD, password);
}
