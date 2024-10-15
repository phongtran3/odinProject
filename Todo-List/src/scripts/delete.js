const overlay = document.getElementById("overlay");
const deleteBtns = document.querySelectorAll(".delete-btn");
const deleteDialog = document.getElementById("delete-dialog-container");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const sideBarContainer = document.getElementById("side-bar-container");


const setUpDeleteDialog = () => {
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-type");

      if (type === "project") {
        const project = btn.closest(".nav-item");

      } else {
        const task = btn.closest(".task-card");
      }
      
      //If on mobile
      if(sideBarContainer.classList.contains("showOverlay")){
        overlay.classList.add("full-overlay");
      }
      else {
        overlay.style.display = overlay.style.display === "none" ? "block" : "none";

      }

      deleteDialog.querySelector("h4").textContent = `Are you sure you want to delete this ${type}?`;
      deleteDialog.showModal();

    });
  });


  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
    deleteDialog.close();
    overlay.style.display = "none";

    if(sideBarContainer.classList.contains("showOverlay")){
      sideBarContainer.classList.toggle("showOverlay");
      overlay.classList.remove("full-overlay");
    }

  });
};

export { setUpDeleteDialog };
