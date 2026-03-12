class Posts {
  constructor(posts) {
    this.posts = posts;
  }

  createPost(username, content) {
    const newPost = {
      id: this.posts.length + 1,
      username: username,
      content: content,
      likes: 0,
      timestamp: Date.now(),
    };
    this.posts.push(newPost);
  }

  likePost(postId) {
    const postToLike = this.posts.find((post) => post.id === postId);

    postToLike.likes++;
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
    return this.posts.filter((post) => post.username === username);
  }
}

const posts = new Posts([
  {
    id: 1,
    username: "Paul",
    content: "Just wrote a song in my sleep!",
    likes: 100,
    timestamp: 17100512322,
  },
  {
    id: 2,
    username: "John",
    content: "Just Imagine!",
    likes: 222,
    timestamp: 1456217100,
  },
  {
    id: 3,
    username: "George",
    content: "Whose mind am I set on?!",
    likes: 32,
    timestamp: 1715330000,
  },
  {
    id: 4,
    username: "Ringo",
    content: "The real players know I'm underated.",
    likes: 112,
    timestamp: 1234505000,
  },
]);

posts.createPost("Yoko", "John, where are you John?");
console.log(posts);
posts.likePost(5);
posts.likePost(3);

posts.sortByNewest();
console.log(posts);

posts.sortByLikes();
console.log(posts);

console.log(posts.getPostsByUser("Ringo"));

// reusable to make new Posts class for a different array of objects
