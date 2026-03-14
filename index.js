// this will be used to make id hash
function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// reusable class for posts
class Posts {
  constructor(posts) {
    this.posts = posts;
  }

  createUniqueId() {
    let newId = generateRandomString(6);
    while (this.posts.some((p) => p.id === newId)) {
      newId = generateRandomString(6);
    }
    return newId;
  }

  createPost(username, content) {
    const newPost = {
      id: this.createUniqueId(),
      username: username,
      content: content,
      likes: 0,
      likedPost: false,
      timestamp: Date.now(),
    };
    this.posts.push(newPost);
    console.log(posts.posts);
  }
  likePost(postId) {
    const postToLike = this.posts.find((post) => post.id === postId);

    if (postToLike) {
      postToLike.likes++;
      postToLike.likedPost = true;
    }
  }
  unlikePost(postId) {
    const postToUnlike = this.posts.find((post) => post.id === postId);

    if (postToUnlike) {
      postToUnlike.likes--;
      postToUnlike.likedPost = false;
    }
  }
  getFeed() {
    return this.posts;
  }
  sortByNewest() {
    return this.posts.sort((a, b) => b.timestamp - a.timestamp);
  }
  sortByLikes() {
    return this.posts.sort((a, b) => b.likes - a.likes);
  }
  getPostsByUser(username) {
    return this.posts.filter(
      (post) => post.username.toLowerCase() === username.toLowerCase(),
    );
  }
  deletePost(id) {
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
// feel free to change this for testing purposes

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
]);
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

// create Posts container and li's
const postsContainer = document.querySelector(".posts-container");
console.log(postsContainer);

const createLis = (array, container) => {
  container.innerHTML = "";
  // controls the message based on the container
  if (array.length === 0) {
    let emptyMessage = document.createElement("li");
    emptyMessage.className = "li-container text-center";
    if (container === foundPostsContainer) {
      emptyMessage.innerHTML =
        "This user doesn't have any more posts! Look for someone else!";
    } else {
      emptyMessage.innerHTML =
        "The posts array is empty! Please add a post in the field below and click the Add Post button to make it appear!!";
    }
    container.appendChild(emptyMessage);
    return;
  }
  // loops through the array and creates each li and it's parts
  array.forEach((item) => {
    let li = document.createElement("li");
    li.className = "li-container flex-column";
    container.appendChild(li);

    let liH3 = document.createElement("h3");
    liH3.textContent = item.content;
    li.appendChild(liH3);

    let liP = document.createElement("p");
    liP.textContent = `author: ${item.username}`;
    liP.className = "li-p";
    li.appendChild(liP);

    let liTimestamp = document.createElement("p");
    const convertEpochToDateOnly = (timeInEpochSecondes) => {
      const dateObject = new Date(timeInEpochSecondes);
      const dateOnly = dateObject.toDateString();
      // e.g., "Wed Mar 15 2023"
      return dateOnly;
    };
    liTimestamp.textContent = `created: ${convertEpochToDateOnly(item.timestamp)}`;
    li.appendChild(liTimestamp);

    let liLikes = document.createElement("p");
    liLikes.textContent = `likes: ${item.likes}`;
    liLikes.className = "li-likes";
    li.appendChild(liLikes);

    let liButtonDiv = document.createElement("div");
    liButtonDiv.className = "post-button-container";
    li.appendChild(liButtonDiv);

    let liLikeButton = document.createElement("button");
    liLikeButton.type = "button";
    liLikeButton.className = "button button-likePost";
    liLikeButton.textContent = "Like";
    liButtonDiv.appendChild(liLikeButton);
    liLikeButton.addEventListener("click", () => {
      if (!item.likedPost) {
        posts.likePost(item.id);
        item.likedPost = true;
        createLis(posts.posts, container);
      } else {
        posts.unlikePost(item.id);
        item.likedPost = false;
        createLis(posts.posts, container);
      }
    });

    liLikeButton.classList.toggle("active", item.likedPost);
    liLikeButton.textContent = item.likedPost ? "Unlike" : "Like";

    let liDeleteButton = document.createElement("button");
    liDeleteButton.type = "button";
    liDeleteButton.className = "button button-deletePost";
    liDeleteButton.textContent = "Delete";
    liButtonDiv.appendChild(liDeleteButton);
    liDeleteButton.addEventListener("click", () => {
      console.log(item.id);
      posts.deletePost(item.id);

      if (container === foundPostsContainer) {
        const updatedUserPosts = posts.getPostsByUser(item.username);
        createLis(updatedUserPosts, container);
      } else {
        createLis(posts.posts, container);
      }
    });
  });
};

// set event listeners on buttons for Posts container
const getFeedButton = document.querySelector(".button-get-feed");
getFeedButton.addEventListener("click", () => {
  createLis(posts.posts, postsContainer);
});

const sortByNewestButton = document.querySelector(".button-sort-by-timestamp");
sortByNewestButton.addEventListener("click", () => {
  posts.sortByNewest();
  createLis(posts.posts, postsContainer);
});

const sortByLikesButton = document.querySelector(".button-sort-by-likes");
sortByLikesButton.addEventListener("click", () => {
  posts.sortByLikes();
  createLis(posts.posts, postsContainer);
});

// add post form event listener
const addPostForm = document.querySelector(".form-addPost");
const userNameInputData = document.querySelector("#newPost-username");
const contentInputData = document.querySelector("#post-content");

// makes text area submit on enter key pressdown
contentInputData.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    addPostForm.requestSubmit();
  }
});

addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = userNameInputData.value;
  const content = contentInputData.value;

  if (username && content) {
    posts.createPost(username, content);

    createLis(posts.posts, postsContainer);

    addPostForm.reset();
  } else {
    alert("Please fill out both fields here!!");
  }
});

// find posts form event listener
const findPostsForm = document.querySelector(".form-getPostsByUsername");
const usernameToLookFor = document.querySelector(
  "#getPostsByUsername-username-input",
);
const foundPostsContainer = document.querySelector(".foundPosts-container");

findPostsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameToLookFor.value.trim();

  if (username) {
    const foundPosts = posts.getPostsByUser(username);

    if (foundPosts.length > 0) {
      console.log("found the posts", foundPosts);
      createLis(foundPosts, foundPostsContainer);
    } else {
      createLis([], foundPostsContainer);
    }
    findPostsForm.reset();
  } else {
    alert("Please enter a valid username!!");
  }
});
