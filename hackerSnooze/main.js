"use strict";

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");

const $navRight = $('.nav-right');

const $storiesContainer = $('.stories-container');
const $heart = $('#heart');

const $authInput = $('#author-name');

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
  ];
  components.forEach(c => c.hide());
}

async function start() {
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();
  if (currentUser) updateUIOnUserLogin();
}

$(start);

$storiesContainer.on('submit', function(e) {
  e.preventDefault();
  const user = currentUser.username;
  let newStory = {};
  newStory['Author_Name'] = document.querySelector('#author-name').value;
  newStory['Title'] = document.querySelector('#story-name').value;
  newStory['URL'] = document.querySelector('#url').value;
  storyList.addStory(user, newStory);
  $storyDiv.empty();
})

