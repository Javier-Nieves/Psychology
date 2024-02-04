"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // DOM selector:

  const chaptersArr = [
    document.querySelector(".top-section"),
    document.querySelector(".self-section"),
    document.querySelector(".values-section"),
    document.querySelector(".topics-section"),
    document.querySelector(".articles-section"),
  ];
  const linksArr = [
    document.querySelector(".brand"),
    document.querySelector(".selfLink"),
    document.querySelector(".valuesLink"),
    document.querySelector(".topicsLink"),
    document.querySelector(".articlesLink"),
  ];
  const offset = window.innerHeight * 0.1; // header's height

  // create chapter links
  linksArr.forEach((link, i) =>
    link.addEventListener("click", () => {
      console.log("scrolling to:", chaptersArr[i].offsetTop - offset);
      window.scrollTo({
        top: chaptersArr[i].offsetTop - offset,
        behavior: "smooth",
      });
    })
  );

  // header style change
  window.addEventListener("scroll", updateHeaderStyle);

  // activate lottie animations
  const animationPath = "/files/therapy.json";

  const container = document.getElementById("lottie-container");

  // Load the Lottie animation
  const animation = lottie.loadAnimation({
    container: container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: animationPath,
  });
});

function updateHeaderStyle() {
  console.log("go");
  const header = document.querySelector("header");
  if (window.scrollY > 0) header.classList.add("scrolled-header");
  else header.classList.remove("scrolled-header");
}
