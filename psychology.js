"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // DOM selector:

  const chaptersArr = [
    document.querySelector(".top-section"),
    document.querySelector(".self-section"),
    document.querySelector(".values-section"),
    document.querySelector(".topics-section"),
    document.querySelector(".articles-section"),
    document.querySelector(".contact-section"),
  ];
  const linksArr = [
    document.querySelector(".brand"),
    document.querySelector(".selfLink"),
    document.querySelector(".valuesLink"),
    document.querySelector(".topicsLink"),
    document.querySelector(".articlesLink"),
    document.querySelector(".top-section__contact-btn"),
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
  const conversationPath = "/files/therapy.json";
  const treePath = "/files/tree.json";
  const conversation = document.getElementById("lottie-conversation");
  const tree = document.getElementById("lottie-tree");
  // Load the Lottie animations
  lottie.loadAnimation({
    container: conversation,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: conversationPath,
  });
  lottie.loadAnimation({
    container: tree,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: treePath,
  });

  function updateHeaderStyle() {
    const header = document.querySelector("header");
    if (window.scrollY > 0) header.classList.add("scrolled-header");
    else header.classList.remove("scrolled-header");
  }
});
