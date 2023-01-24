"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

class Story {

  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }

  getHostName() {
    const url = new URL(`${this.url}`);
    return url.hostname;
  }
}

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  static async getStories() {

    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "GET",
    });

    const stories = response.data.stories.map(story => new Story(story));

    return new StoryList(stories);
  }


  async addStory(user, newStory) {
    const test = await axios.post(`${BASE_URL}/stories`, {
      "token": `${currentUser.loginToken}`,
      "story": {
        "author": `${newStory.Author_Name}`,
        "title": `${newStory.Title}`,
        "url": `${newStory.URL}`
      }
    
    })
    console.log(test)
    const storyObj = {}
    storyObj['storyId'] = test.data.story.storyId;
    storyObj['title'] = test.data.story.title;
    storyObj['author'] = test.data.story.author;
    storyObj['url'] = test.data.story.url;
    storyObj['username'] = test.data.story.username;
    storyObj['createdAt'] = test.data.story.createdAt;
    const newestStory = new Story(storyObj);
    currentUser.ownStories.shift(newestStory);
    return newestStory;
  }
}

class User {

  constructor({
                username,
                name,
                createdAt,
                favorites = [],
                ownStories = []
              },
              token) {
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;

    this.favorites = favorites.map(s => new Story(s));
    this.ownStories = ownStories.map(s => new Story(s));

    this.loginToken = token;
  }

  static async signup(username, password, name) {
    const response = await axios({
      url: `${BASE_URL}/signup`,
      method: "POST",
      data: { user: { username, password, name } },
    });

    let { user } = response.data

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  static async login(username, password) {
    const response = await axios({
      url: `${BASE_URL}/login`,
      method: "POST",
      data: { user: { username, password } },
    });

    let { user } = response.data;

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  static async loginViaStoredCredentials(token, username) {
    try {
      const response = await axios({
        url: `${BASE_URL}/users/${username}`,
        method: "GET",
        params: { token },
      });

      let { user } = response.data;

      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories
        },
        token
      );
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }

  async addFavorite(story) {
    this.favorites.push(story);
    await this._addOrRemoveFavorite("add", story);
    console.log(currentUser.favorites);
  }

  async removeFavorite(story) {
    this.favorites = this.favorites.filter(s => s.storyId !== story.storyId);
    await this._addOrRemoveFavorite("remove", story);
    console.log(currentUser.favorites);
  }

  async _addOrRemoveFavorite(newState, story) {
    const method = newState === "add" ? "POST" : "DELETE";
    const token = this.loginToken;
    await axios({
      url: `${BASE_URL}/users/${this.username}/favorites/${story.storyId}`,
      method: method,
      data: { token },
    });
  }

  isFavorite(story) {
    return this.favorites.some(s => (s.storyId === story.storyId));
  }
}
