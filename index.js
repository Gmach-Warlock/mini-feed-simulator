function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

class Posts {
  constructor(posts) {
    this.posts = posts;
  }

  createPost(username, content) {
    const newPost = {
      id: generateRandomString(6),
      username: username,
      content: content,
      likes: 0,
      liked: false,
      timestamp: Date.now(),
    };
    this.posts.push(newPost);
    console.log(posts.posts);
  }

  likePost(postId) {
    const postToLike = this.posts.find((post) => post.id === postId);

    postToLike.likes++;
  }
  unlikePost(postId) {
    const postToUnlike = this.posts.find((post) => post.id === postId);

    postToUnlike.likes--;
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
    content: "Just wrote a song in my sleep!",
    likes: 100,
    liked: false,
    timestamp: 17100512322,
  },
  {
    id: 2,
    username: "John",
    content: "Just Imagine!",
    likes: 222,
    liked: false,
    timestamp: 1456217100,
  },
  {
    id: 3,
    username: "George",
    content: "Whose mind am I set on?!",
    likes: 32,
    liked: false,
    timestamp: 1715330000,
  },
  {
    id: 4,
    username: "Ringo",
    content: "The real players know I'm underated.",
    likes: 112,
    likedPost: false,
    timestamp: 1234505000,
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

// reusable to make new Posts class for a different array of objects

const postsContainer = document.querySelector(".posts-container");
console.log(postsContainer);

const createLis = (array, container) => {
  container.innerHTML = "";

  if (array.length === 0) {
    let emptyMessage = document.createElement("li");
    emptyMessage.className = "li-container text-center";
    emptyMessage.innerHTML =
      "The posts array is empty! Please add a post in the field below and click the Add Post button to make it appear!!";
    container.appendChild(emptyMessage);
    return;
  }

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

    let liDeleteButton = document.createElement("button");
    liDeleteButton.type = "button";
    liDeleteButton.className = "button button-deletePost";
    liDeleteButton.textContent = "Delete";
    liButtonDiv.appendChild(liDeleteButton);
    liDeleteButton.addEventListener("click", () => {
      console.log(item.id);
      posts.deletePost(item.id);
      createLis(posts.posts, container);
    });
  });
};

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

const addPostForm = document.querySelector(".form-addPost");
const userNameInputData = document.querySelector("#newPost-username");
const contentInputData = document.querySelector("#post-content");

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
      findPostsForm.reset();
    } else {
      alert("no items found");
    }
  } else {
    alert("Please enter a valid username!!");
  }
});
