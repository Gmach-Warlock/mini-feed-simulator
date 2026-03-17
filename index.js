// hidden modal logic for custom alert windows
const showModal = (message) => {
  const modal = document.querySelector("#custom-modal");
  const msgElement = document.querySelector("#modal-message");
  const confirmBtn = document.querySelector("#modal-confirm");
  const cancelBtn = document.querySelector("#modal-cancel");

  msgElement.textContent = message;
  modal.classList.remove("hidden");

  return new Promise((resolve) => {
    confirmBtn.onclick = () => {
      modal.classList.add("hidden");
      resolve(true);
    };
    cancelBtn.onclick = () => {
      modal.classList.add("hidden");
      resolve(false);
    };
  });
};

const validInput = (text) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const isValid = text.split("").every((char) => possible.includes(char));

  return {
    isValid: isValid,
    allowedChars: "Letters, numbers, and !@#$%*",
  };
};

// reusable class for posts
class Posts {
  constructor(posts) {
    this.posts = posts;
  }

  createUniqueId() {
    function generateRandomString(length) {
      let text = "";
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }
    let newId = generateRandomString(6);

    while (this.posts.some((p) => p.id === newId)) {
      newId = generateRandomString(6);
    }
    return newId;
  }

  createPost(username, content) {
    if (!validInput(username).isValid || !validInput(content).isValid) {
      return "invalid";
    }

    const isDuplicate = this.posts.some(
      (p) => p.username === username && p.content === content,
    );

    if (isDuplicate) {
      return "duplicate";
    }

    const newPost = {
      id: this.createUniqueId(),
      username: username,
      content: content,
      likes: 0,
      likedPost: false,
      timestamp: Date.now(),
    };
    this.posts.push(newPost);
    return "success";
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
const postsContainer = document.querySelector(".feed__container");

// create list items
const createLis = (array, container) => {
  // wipe previous contents before creating, allowing the initial messages
  container.innerHTML = "";
  // controls the message based on the container and its contents
  if (array.length === 0) {
    let emptyMessage = document.createElement("li");
    emptyMessage.className = "feed__item";
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
    const li = document.createElement("li");
    li.className = "feed__item";
    container.appendChild(li);

    const liH3 = document.createElement("h3");
    liH3.textContent = item.content;
    li.appendChild(liH3);

    const liP = document.createElement("p");
    liP.textContent = `author: ${item.username}`;
    liP.className = "feed__author";
    li.appendChild(liP);

    const liTimestamp = document.createElement("p");
    // convert the timestamp to readable format (e.g., "Wed Mar 15 2023")
    const convertEpochToDateOnly = (timeInEpochSecondes) => {
      const dateObject = new Date(timeInEpochSecondes);
      const dateOnly = dateObject.toDateString();
      return dateOnly;
    };
    liTimestamp.textContent = `created: ${convertEpochToDateOnly(item.timestamp)}`;
    li.appendChild(liTimestamp);

    const liLikes = document.createElement("p");
    liLikes.textContent = `likes: ${item.likes}`;
    liLikes.className = "feed__likes";
    li.appendChild(liLikes);

    const liButtonDiv = document.createElement("div");
    liButtonDiv.className = "feed__actions";
    li.appendChild(liButtonDiv);

    const liLikeButton = document.createElement("button");
    liLikeButton.type = "button";
    liLikeButton.className = "btn btn--like";
    liLikeButton.textContent = "Like";
    liLikeButton.classList.toggle("btn--active", item.likedPost);
    liLikeButton.textContent = item.likedPost ? "Unlike" : "Like";
    liButtonDiv.appendChild(liLikeButton);

    const liDeleteButton = document.createElement("button");
    liDeleteButton.type = "button";
    liDeleteButton.className = "btn btn--delete";
    liDeleteButton.textContent = "Delete";
    liButtonDiv.appendChild(liDeleteButton);

    // like button event listener
    liLikeButton.addEventListener("click", () => {
      if (!item.likedPost) {
        posts.likePost(item.id);
        item.likedPost = true;
      } else {
        posts.unlikePost(item.id);
        item.likedPost = false;
      }

      if (container === foundPostsContainer) {
        const updatedUserPosts = posts.getPostsByUser(item.username);
        createLis(updatedUserPosts, container);
      } else {
        createLis(posts.posts, container);
      }
    });

    // delete button event listener
    liDeleteButton.addEventListener("click", async (e) => {
      e.preventDefault();
      // add last verification window
      const confirmed = await showModal(
        "Are you sure? This is permanent!",
        true,
      );
      if (confirmed) {
        console.log(item.id);
        posts.deletePost(item.id);

        if (container === foundPostsContainer) {
          const updatedUserPosts = posts.getPostsByUser(item.username);
          createLis(updatedUserPosts, container);
        } else {
          createLis(posts.posts, container);
        }
      }
    });
  });
};

// event listeners on buttons for Posts container
const getFeedButton = document.querySelector(".btn--feed");
getFeedButton.addEventListener("click", () => {
  createLis(posts.posts, postsContainer);
});

const sortByNewestButton = document.querySelector(".btn--timestamp");
sortByNewestButton.addEventListener("click", () => {
  posts.sortByNewest();
  createLis(posts.posts, postsContainer);
});

const sortByLikesButton = document.querySelector(".btn--likes");
sortByLikesButton.addEventListener("click", () => {
  posts.sortByLikes();
  createLis(posts.posts, postsContainer);
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
      createLis(posts.posts, postsContainer);
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
const foundPostsContainer = document.querySelector(".find__feed");
const clearSearchButton = document.querySelector("#find__clear");
console.log(findPostsForm, usernameToLookFor, foundPostsContainer);

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

  const foundPosts = posts.getPostsByUser(username);

  if (foundPosts.length > 0) {
    console.log("found the posts", foundPosts);
    createLis(foundPosts, foundPostsContainer);
  } else {
    createLis([], foundPostsContainer);
  }
  findPostsForm.reset();
});

// clear search button event listener
clearSearchButton.addEventListener("click", () => {
  usernameToLookFor.value = "";
  foundPostsContainer.innerHTML = `    <li class="feed__item">
      <p>Please enter a name to search for and click Find Posts!</p>
    </li>`;
});
