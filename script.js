var isToggled = false;
var themeToggle = document.getElementById("theme-toggle");
var themeIcon = document.getElementById("theme-icon");

//save in local storage function
function setStorage(theme) {
  window.localStorage.setItem("vanilla-js-sketches", theme);
}
function getStorage() {
  return window.localStorage.getItem("vanilla-js-sketches");
}
//theme switch function
function setTheme(theme) {
  if (themeIcon) {
    if (theme === "dark") {
      themeIcon.src = "/img/moon.svg";
      isToggled = true;
      document.body.setAttribute("theme", "dark");
      setStorage(theme);
    } else {
      themeIcon.src = "/img/sun.svg";
      isToggled = false;
      document.body.setAttribute("theme", "light");
      setStorage(theme);
    }
  }
}

//switch theme based on  save setting or os setting with media query
if (getStorage()) {
  setTheme(getStorage());
} else {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
}

//setup theme toggle button functionality
function handleToggle(event) {
  if (isToggled) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}
if (themeToggle) {
  themeToggle.addEventListener("click", handleToggle);
}
