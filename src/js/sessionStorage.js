export function getTokenFromLocalStorage() {
  return localStorage.getItem("jwtToken");
}

export function saveTokenToLocalStorage(token) {
  localStorage.setItem("jwtToken", token);
}

export function removeTokenFromLocalStorage() {
  localStorage.removeItem("jwtToken");
}
