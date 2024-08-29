export function onOverlayClick(e) {
  document.getElementById("nav-container").classList.remove("showOverlay");
  document.getElementById("overlay").style.display = "none";
}

export function createElement(tag, className, id, content) {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (id) element.id = id;
  if (content) element.textContent = content;
  return element;
}
