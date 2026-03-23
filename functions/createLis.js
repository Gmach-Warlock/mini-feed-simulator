import { convertEpochToDateOnly } from "./convertEpochToDateOnly.js";
import { showModal } from "./showModal.js";

// create list items
export const createLis = (
  array,
  container,
  classInstance,
  isSearching,
  refreshCallback,
) => {
  // wipe previous contents before creating, allowing the initial messages
  container.innerHTML = "";

  if (array.length === 0) {
    let emptyMessage = document.createElement("li");
    emptyMessage.className = "feed__item";
    if (isSearching) {
      emptyMessage.innerHTML =
        "This user doesn't have any posts! Look for someone else!";
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

    liTimestamp.textContent = `created: ${convertEpochToDateOnly(item.timestamp)}`;
    li.appendChild(liTimestamp);

    const liLikes = document.createElement("p");
    liLikes.textContent = `likes: ${item.likes}`;
    liLikes.className = "feed__likes";
    li.appendChild(liLikes);

    // creates buttons in main feed only

    const liButtonDiv = document.createElement("div");
    liButtonDiv.className = "feed__actions";
    li.appendChild(liButtonDiv);

    const liLikeButton = document.createElement("button");
    liLikeButton.type = "button";
    liLikeButton.className = "btn btn--like";
    liLikeButton.classList.toggle("btn--active", item.likedPost);
    liLikeButton.textContent = item.likedPost ? "Unlike" : "Like";
    liButtonDiv.appendChild(liLikeButton);

    const liDeleteButton = document.createElement("button");
    liDeleteButton.type = "button";
    liDeleteButton.className = "btn btn--delete";
    liDeleteButton.textContent = "Delete";
    liButtonDiv.appendChild(liDeleteButton);

    // Like Button Event

    liLikeButton.addEventListener("click", () => {
      // 1. Update the data state
      if (!item.likedPost) {
        classInstance.likePost(item.id);
        item.likedPost = true;
      } else {
        classInstance.unlikePost(item.id);
        item.likedPost = false;
      }

      if (refreshCallback) refreshCallback();
    });

    // Delete Button Event
    liDeleteButton.addEventListener("click", async (e) => {
      e.preventDefault();
      const confirmed = await showModal(
        "Are you sure? This is permanent!",
        true,
      );
      if (confirmed) {
        classInstance.deletePost(item.id);
        if (refreshCallback) refreshCallback();
      }
    });
  });
};
