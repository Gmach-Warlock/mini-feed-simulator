import { showModal } from "./functions/showModal.js";
import { validInput } from "./functions/validInput.js";
import { createLis } from "./functions/createLis.js";
import { Posts } from "./classes/Posts.js";

// Test Array: feel free to change this for testing purposes

const posts = new Posts([
  {
    id: 1,
    username: "Paul",
    content: "Just wrote another song in my sleep!",
    likes: 500,
    likedPost: false,
    timestamp: 117100512322,
  },
  {
    id: 2,
    username: "John",
    content: "Just Imagine!",
    likes: 222,
    likedPost: false,
    timestamp: 91456217100,
  },
  {
    id: 3,
    username: "George",
    content: "Whose mind am I set on?!",
    likes: 332,
    likedPost: false,
    timestamp: 613715330000,
  },
  {
    id: 4,
    username: "Ringo",
    content: "The real players know I'm underated.",
    likes: 112,
    likedPost: false,
    timestamp: 724234505000,
  },
  {
    id: 5,
    username: "Paul",
    content: "The Super Bowl was cool to play!",
    likes: 610,
    likedPost: false,
    timestamp: 1117100512322,
  },
  {
    id: 6,
    username: "Michael",
    content: "Mine ok Paul, mine, mine!",
    likes: 382,
    likedPost: false,
    timestamp: 615456217100,
  },
  {
    id: 7,
    username: "Paul",
    content: "I don't believe it!!",
    likes: 544,
    likedPost: false,
    timestamp: 615715330000,
  },
  {
    id: 8,
    username: "Ringo",
    content: "So much drama.",
    likes: 1112,
    likedPost: false,
    timestamp: 724234505000,
  },
  {
    id: 9,
    username: "Billy",
    content: "It's a nice day to go on a plane.",
    likes: 649,
    likedPost: false,
    timestamp: 615715330000,
  },
  {
    id: 10,
    username: "Inigo",
    content: "You better not be lying about the six fingers!!",
    likes: 1500,
    likedPost: false,
    timestamp: 574234505000,
  },
]);

const postsContainer = document.querySelector(".feed__container");
const searchTerms = document.querySelector(".find__input");

let isSearching = false;
let currentSearchTerm = "";

const refreshUI = () => {
  const dataToDisplay = isSearching
    ? posts.getPostsByUser(currentSearchTerm)
    : posts.posts;

  createLis(dataToDisplay, postsContainer, posts, isSearching, refreshUI);
};
// orginal project tests
/* posts.createPost("Yoko", "John, where are you John?");
console.log(posts);
posts.likePost(5);
posts.likePost(3);
posts.sortByNewest();
console.log(posts);
posts.sortByLikes();
console.log(posts);
console.log(posts.getPostsByUser("Ringo")); */

// create Posts container

// event listeners on buttons for Posts container
const getFeedButton = document.querySelector(".btn--feed");
getFeedButton.addEventListener("click", () => {
  isSearching = false;
  refreshUI();
});

const sortByNewestButton = document.querySelector(".btn--timestamp");
sortByNewestButton.addEventListener("click", () => {
  posts.sortByNewest();
  refreshUI();
});

const sortByLikesButton = document.querySelector(".btn--likes");
sortByLikesButton.addEventListener("click", () => {
  posts.sortByLikes();
  refreshUI();
});

// add post form event listener
const addPostForm = document.querySelector(".add__form");
const userNameInputData = document.querySelector("#newPost-username");
const contentInputData = document.querySelector("#post-content");

// makes text area submit on enter key pressdown (not default)
contentInputData.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    addPostForm.requestSubmit();
  }
});

addPostForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = userNameInputData.value;
  const content = contentInputData.value;

  if (username && content) {
    const result = posts.createPost(username, content);

    if (result === "invalid") {
      await showModal(
        "Invalid Characters! Please use letters, numbers or basic symbols!!",
      );
    } else if (result === "duplicate") {
      await showModal("You have already posted this EXACT message!!!");
    } else {
      console.log(searchTerms);
      refreshUI();
      addPostForm.reset();
    }
  } else {
    await showModal("Please fill out both fields!!");
  }
});

// find posts form event listener
const findPostsForm = document.querySelector(".find__form");
const usernameToLookFor = document.querySelector(
  "#getPostsByUsername-username-input",
);

findPostsForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameToLookFor.value.trim();

  if (!username) {
    await showModal("Please enter a username to search for!!");
  }

  const validation = validInput(username);

  if (!validation.isValid) {
    await showModal(
      "Search contains invalid characters! Please use alpha numeric and basic symbols!!",
    );
    findPostsForm.reset();
    return;
  }

  isSearching = true;
  currentSearchTerm = username;

  refreshUI();
  findPostsForm.reset();
});
