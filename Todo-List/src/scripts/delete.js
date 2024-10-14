const overlay = document.getElementById("overlay");
const deleteBtns = document.querySelectorAll(".delete-btn");
const deleteDialog = document.getElementById("delete-dialog-container");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");

const setUpDeleteDialog = () => {
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-type");

      if (type === "project") {
        const project = btn.closest(".nav-item");

        deleteDialog.querySelector("h4").textContent = `Are you sure you want to delete this ${type}?`;
      } else {
        const task = btn.closest(".task-card");
        deleteDialog.querySelector("h4").textContent = `Are you sure you want to delete this ${type}?`;
      }

      deleteDialog.showModal();
      overlay.style.display = overlay.style.display === "none" ? "block" : "none";
    });
  });

  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
    deleteDialog.close();
    overlay.style.display = "none";
  });
};

export { setUpDeleteDialog };
