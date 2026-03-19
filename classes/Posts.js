import { generateRandomString } from "../functions/generateRandomString.js";
import { validInput } from "../functions/validInput.js";

// reusable class for posts
export class Posts {
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
    console.log(newPost);
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
