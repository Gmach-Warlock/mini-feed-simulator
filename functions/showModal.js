// hidden modal logic for custom alert windows

export const showModal = (message, isChoice = false) => {
  const modal = document.querySelector("#custom-modal");
  const msgElement = document.querySelector("#modal-message");
  const confirmBtn = document.querySelector("#modal-confirm");
  const cancelBtn = document.querySelector("#modal-cancel");

  msgElement.textContent = message;

  if (isChoice) {
    cancelBtn.classList.remove("hidden");
  } else {
    cancelBtn.classList.add("hidden");
  }

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
