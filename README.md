# Mini Feed Simulator Project

- In this project we are to create a social feed engine which allows a posts array to be manipulated.

## Requirements

- Post object should have
  - id
  - username
  - content
  - likes
  - timestamp
- likePost(postId)
  - takes in a postId and increases that posts likes by 1.
- Display Feed
  - returns the posts array.
- Sort the feed
  - sortbyNewest() should sort by most recent (greatest)timestamp.
  - sortByLikes() should sort likes in descending order
- Filter Posts by User.
  - getPostsByUser() should return all of the posts by the username provided.

## Posts class

- I used a class to create the posts to allow for future scalability. This would allow these functions to be used in multiple instances, making it usable with multiple social platforms or feeds.

## DOM manipulation and Event Listeners Added

- button created to display the feed.
- sort buttons created, and items sorted in descending order as needed according to likes or timestamp.
- an area for creating new posts with a username input and a content textfield.
- each post has a like and delete button.
- an input field for username and a find button created to search for the posts of a particular user.
- a default message is displayed in the window as well as custom messages based on the current operation.
- any time any changes are made the feed is re-rendered
- CSS styled using BEM principles.

## Special Features

- Stretch Goals all met.
- Custom animations
  - Wind animation: title and main buttons feel like they are being blow in by wind.
  - Hover glare: hover over a button for 2 seconds and a glare swipes over the button.
- Glassmorphism Design: Used semi-transparent backgrounds with a backdrop-filter: blur() to give cards modern floating appearance.
- Shadow hover: designed to feel like there is a looming presence when a container is hovered over.
- Delete Confirmation: A final confirmation is needed to delete a post.
- Clear Search Button: an extra button was added to clear the search results window.
- Unlike Button: an unlike button was added for realism
- Responsive Feed Container: an overflow-y added to maintain window layout regardless of the array size.

- Custom Themed Alert Windows and Scrollbars: Deep integeration of my color palette into the UI.
  - Custom hover states for the scrollbar and the alert window buttons.
