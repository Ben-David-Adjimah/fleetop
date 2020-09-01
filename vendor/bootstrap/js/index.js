let currentlyOpenModals = {};
const noModalsOpen = () => !Object.keys(currentlyOpenModals).length;

const modalWrapper = document.querySelector(".modal-wrapper");

const modalTriggers = document.querySelectorAll(".modal-trigger");
modalTriggers.forEach((modalTrigger) => {
  modalTrigger.addEventListener("click", (clickEvent) => {
    const trigger = clickEvent.target;
    const modalId = trigger.getAttribute("data-modal-id");
    openModal(modalId);
  });
});

const openModal = (modalId) => {
  // If we're opening the first modal, make sure the wrapper becomes visible too
  if (noModalsOpen()) {
    modalWrapper.classList.add("visible");
  }

  const modal = document.getElementById(modalId);
  modal.classList.add("visible");
  currentlyOpenModals[modalId] = modal;
};

const closeModal = (modalId) => {
  if (noModalsOpen()) {
    return;
  }

  const modal = currentlyOpenModals[modalId];
  modal.classList.remove("visible");
  delete currentlyOpenModals[modalId];

  // If we closed the last open modal, hide the wrapper
  if (noModalsOpen()) {
    modalWrapper.classList.remove("visible");
  }
};

document.querySelectorAll(".close-modal-button").forEach((closeModalButton) => {
  closeModalButton.addEventListener("click", (clickEvent) => {
    const modalToClose = clickEvent.target.closest(".modal-window");
    closeModal(modalToClose.id);
  });
});

document.querySelectorAll(".modal-window").forEach((modal) => {
  modal.addEventListener("click", (clickEvent) => {
    clickEvent.stopPropagation();
  });
});

modalWrapper.addEventListener("click", () => {
  closeAllModals();
});

const closeAllModals = () => {
  // Iterate over the IDs in our map and close each modal with that ID
  Object.keys(currentlyOpenModals).forEach(closeModal);
};

document.body.addEventListener("keyup", (keyEvent) => {
  if (keyEvent.key === "Escape") {
    closeAllModals();
  }
});
