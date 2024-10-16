//import project and task class

const overlay = document.getElementById("overlay");

const newProjectDialog = document.getElementById("new-project-dialog-container");
const sideBarContainer = document.getElementById("side-bar-container");

const newProjectForm = document.querySelector(".add-project-form");
const projectCancelBtn = newProjectForm.querySelector(".cancel-btn");
const projectAddBtn = newProjectForm.querySelector(".add-btn");

const closeDialog = () => {
  newProjectForm.reset();
  newProjectDialog.close();
  overlay.style.display = "none";
};

const setUpAddProject = () => {
  //Cancel Button Logic
  projectCancelBtn.addEventListener("click", () => {
    if (sideBarContainer.classList.contains("showOverlay")) {
      sideBarContainer.classList.toggle("showOverlay");
      overlay.classList.remove("full-overlay");
    }

    closeDialog();
    console.log("Cancel");
  });

  newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const projectTitle = newProjectForm.querySelector(".new-project").value.trim();
    console.log(projectTitle);

    //Reset form, dialog, and overlay
    if (sideBarContainer.classList.contains("showOverlay")) {
      sideBarContainer.classList.toggle("showOverlay");
      overlay.classList.remove("full-overlay");
    }

    closeDialog();
  });

  console.log("Add New Project");
  if (sideBarContainer.classList.contains("showOverlay")) {
    overlay.classList.add("full-overlay");
  } else {
    overlay.style.display = overlay.style.display === "none" ? "block" : "none";
  }

  newProjectDialog.showModal();
};

export { setUpAddProject };
