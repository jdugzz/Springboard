"use strict";

let currentUser;

async function login(evt) {
  console.debug("login", evt);
  evt.preventDefault();

  const username = $("#login-username").val();
  const password = $("#login-password").val();

  currentUser = await User.login(username, password);

  $loginForm.trigger("reset");
  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
}

$loginForm.on("submit", login);

async function signup(evt) {
  console.debug("signup", evt);
  evt.preventDefault();

  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();

  currentUser = await User.signup(username, password, name);

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();

  $signupForm.trigger("reset");
}

$signupForm.on("submit", signup);

function logout(evt) {
  console.debug("logout", evt);
  localStorage.clear();
  location.reload();
}

$navLogOut.on("click", logout);

async function checkForRememberedUser() {
  console.debug("checkForRememberedUser");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return false;

  currentUser = await User.loginViaStoredCredentials(token, username);
}

function saveUserCredentialsInLocalStorage() {
  console.debug("saveUserCredentialsInLocalStorage");
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}

function updateUIOnUserLogin() {
  console.debug("updateUIOnUserLogin");

  $allStoriesList.show();

  updateNavOnLogin();
}

async function toggleStoryFavorite(e) {
  console.debug("toggleStoryFavorite");
  const $tgt = $(e.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);

  if ($tgt.hasClass("filled")) {
    await currentUser.removeFavorite(story);
    $tgt.closest("span").toggleClass("filled");
  } else {
    await currentUser.addFavorite(story);
    $tgt.closest("span").toggleClass("filled");
  }
}

$allStoriesList.on("click", "span", toggleStoryFavorite);
