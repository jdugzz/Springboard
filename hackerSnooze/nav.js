"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */



function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $('.nav-right').prepend('<a class=main-nav-links href=# id=new-story>Add Story</a>');
  $('.nav-right').prepend('<a class=main-nav-links href=# id=favorites>Favorites</a>');
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

$navRight.on('click', '#new-story', function() {
  const authorName = document.querySelector('#author-name');
  if (!authorName) {
  $storiesContainer.prepend(`
  <div id=story-form>
  <form>
  <label for='author'>Author</label>
  <input type='text' id='author-name' name='author'> <br>
  <label for='title'>Title</label>
  <input type ='text' id='story-name' name='title'> <br>
  <label for='url'>URL<label>
  <input type='text' id='url' name='url'> <br> <input type='submit' class = submit value='Add Story'> <br>
  <input type=button class = close value=Close></input>
  <hr>
  </form>
  </div>
  `);
  }
})

$storiesContainer.on('click', '.close', function(e) {
  e.preventDefault;
  const $storyDiv = $('#story-form');
  const $favoritesDiv = $('#favoriteList');
  $storyDiv.empty();
  $favoritesDiv.remove();
  
})

$navRight.on('click', '#favorites', function() {
  let favorites = document.querySelector('#favoriteList')
  if (!favorites) {
  $storiesContainer.prepend(`
  <div><ol id=favoriteList></ol></div
  `);
  const $favorites = $('#favoriteList');
  
  for ( let i = 0; i <currentUser.favorites.length; i++) {
    $favorites.append(`
    <li id = ${currentUser.favorites[i].storyId}> 
      <a href="${currentUser.favorites[i].url}" class=story-link>
      ${currentUser.favorites[i].title}
      </a>
      <small class="story-hostname">(${currentUser.favorites[i].hostName})</small>
      <small class="story-author">by ${currentUser.favorites[i].author}</small>
      <small class="story-user"> posted by ${currentUser.favorites[i].username}</small>
      <input class=remove-button type=button value=Remove>
    `)
  }
  $favorites.append(`<input type=button class = close value=Close></input>`);
  }
  
})

$storiesContainer.on('click', '.remove-button', async function(e) {
  const token = currentUser.loginToken;
  const username = currentUser.username;
  const $liId = $(this).parent().attr('id');
  await axios({
    url: `${BASE_URL}/users/${username}/favorites/${$liId}`,
    method: 'DELETE',
    data: {token}
  })
  $(`#${$liId}`).remove();
})
