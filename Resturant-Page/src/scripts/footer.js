const socialLinks = {
  github: {
    href: "https://github.com/phongtran3",
    class: "fab fa-github",
  },
  instagram: {
    href: "https://www.instagram.com/phongtran_3/",
    class: "fab fa-instagram",
  },
  linkedin: {
    href: "https://www.linkedin.com/in/phong-tran230/",
    class: "fab fa-linkedin-in",
  },
};

export default function createFooter() {
  const content = document.getElementById("content");
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  //Copyright Div
  const copyRightDiv = document.createElement("div");
  copyRightDiv.classList.add("copyright");
  const copyRightParagraph = document.createElement("p");
  copyRightParagraph.innerHTML = "&copy; Phong Tran";
  copyRightDiv.appendChild(copyRightParagraph);

  //Footer title div
  const footerTitleDiv = document.createElement("div");
  const footerTitleP1 = document.createElement("p");
  const footerTitleP2 = document.createElement("p");
  footerTitleP1.innerHTML = "The Oden Project: 7 Leaves Cafe Clone";
  footerTitleDiv.appendChild(footerTitleP1);
  footerTitleP2.innerHTML = "All images and text used on this site are property of 7 Leaves Cafe. This site is a clone and does not own any rights to the images and text.";
  footerTitleDiv.append(footerTitleP2);

  //Social media div
  const socialMediaDiv = document.createElement("div");
  socialMediaDiv.classList.add("social-media-links");

  Object.values(socialLinks).forEach(({ href, class: className }) => {
    const a = document.createElement("a");
    a.href = href;
    a.rel = "noopener noreferrer";
    a.target = "_blank";
    a.classList.add("social-links");

    const icon = document.createElement("i");
    icon.classList.add(...className.split(" "));
    a.appendChild(icon);
    socialMediaDiv.appendChild(a);
  });

  footer.append(copyRightDiv, footerTitleDiv, socialMediaDiv);

  content.appendChild(footer);
}
