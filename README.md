# Mini Feed Simulator Project

- In this project we are to create a social feed engine which allows a posts array to be manipulated

## Requirements

- Post object should have
  - id
  - username
  - content
  - likes
  - timestamp
- likePost(postId)
  - takes in a postId and increases that posts likes by 1
- Display Feed
  - returns the posts array
- Sort the feed
  - sortbyNewest() should sort by most recent (greatest)timestamp
  - sortByLikes() should sort likes in descending order
- Filter Posts by User
  - getPostsByUser() should return all of the posts by the username provided

- No DOM manipulation
- No frameworks

### Posts class

- I used a class to create the posts to allow for future scalability. This would allow these functions to be used in multiple instances, making it usable with multiple social platforms or feeds.
