// const { response } = require("express");

const URL = "http://localhost:3000/tweets";

//on search enter
const onEnter = (e) => {
  if (e.key == "Enter") {
    getTwitterData();
  }
};
/**
 * Retrive Twitter Data from API
 */
const getTwitterData = () => {
  const query = document.getElementById("user-search-input").value;
  if (!query) return; // i.,e. if there is no query, return null
  /**In order to use sepcial characters like(#,%,$ etc) in query, we need to use encoding in JS
   * it encodes charcaters such as
   * ex: var set = ";,/?:@&%@#$!#^%&^@*&#!(*#)+=_-("
   * console.log(encodeURIComponent(set));
   */
  const encodedQuery = encodeURIComponent(query);
  const fullUrl = `${URL}?q=${encodedQuery}&count=10`;
  fetch(fullUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      buildTweets(data.statuses);
    });
};

// getTwitterData();

/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {};

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {};

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {};

/**
 * Build Tweets HTML based on Data from API
 */
const buildTweets = (tweets, nextPage) => {
  let twitterContent = "";
  tweets.map((tweet) => {
    twitterContent += `<div class="tweet-container">
          <div class="tweet-user-info">
              <div class="tweet-user-profile"></div>
              <div class="tweet-user-name-container">
                  <div class="tweet-user-fullname">${tweet.user.name}</div>
                  <div class="tweet-user-username">${tweet.user.screen_name}</div>
              </div>
          </div>`;
    if (tweet.extended_entities && tweet.extended_entities.media.length > 0) {
      twitterContent += buildImages(tweet.extended_entities.media);
    }
    twitterContent += `
          <div class="tweet-text-container">${tweet.full_text}
          </div>
          <div class="tweet-date-container">20hrs ago </div>
        </div>`;
  });
  document.querySelector(".tweets-list").innerHTML = twitterContent;
};

/**
 * Build HTML for Tweets Images
 */
const buildImages = (mediaList) => {
  let imagesContent = `<div class="tweet-images-container">`;
  let imagesExist = false;
  mediaList.map((media) => {
    if (media.type == "photo") {
      imagesExist = true;
      imagesContent += `
                <div class="tweet-image" style="background-image: url(${media.media_url_https})"></div>
            `;
    }
  });
  imagesContent += `</div>`;
  return imagesExist ? imagesContent : "";
};

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {};
