"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const animationPath = "/files/therapy.json";

  // Replace 'lottie-container' with the ID of your container element
  const container = document.getElementById("lottie-container");
  console.log("selected", container);

  // Load the Lottie animation
  const animation = lottie.loadAnimation({
    container: container,
    renderer: "svg", // You can use 'canvas' or 'html' as well
    loop: true,
    autoplay: true,
    path: animationPath,
  });
});
