"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // DOM selector:
  //   const topSection = document.querySelector(".top-section");
  //   const selfSection = document.querySelector(".self-section");
  //   const valuesSection = document.querySelector(".values-section");
  //   const topicsSection = document.querySelector(".topics-section");
  //   const articlesSection = document.querySelector(".articles-section");
  const chaptersArr = [
    document.querySelector(".top-section"),
    document.querySelector(".self-section"),
    document.querySelector(".values-section"),
    document.querySelector(".topics-section"),
    document.querySelector(".articles-section"),
  ];

  const brandLink = document.querySelector(".brand");
  const selfLink = document.querySelector(".selfLink");
  const valuesLink = document.querySelector(".valuesLink");
  const topicsLink = document.querySelector(".topicsLink");
  const articlesLink = document.querySelector(".articlesLink");
  const linksArr = [brandLink, selfLink, valuesLink, topicsLink, articlesLink];
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
