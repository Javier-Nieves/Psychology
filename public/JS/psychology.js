"use strict";
// import { handleUserMessage } from "./sender.js";

console.log("working");
// DOM selector:
const contactFrom = document.querySelector("#contact-form");

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

//! Handlers
// create chapter links
const offset = window.innerHeight * 0.1; // header's height
linksArr.forEach((link, i) =>
  link.addEventListener("click", () => {
    console.log("scrolling to:", chaptersArr[i].offsetTop - offset);
    window.scrollTo({
      top: chaptersArr[i].offsetTop - offset,
      behavior: "smooth",
    });
  })
);

// send contact emails
contactFrom.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form filled");
  const data = new FormData();
  data.append("name", document.querySelector("#contact-name"));
  data.append("email", document.querySelector("#contact-email"));
  data.append("message", document.querySelector("#contact-message"));
  handleUserMessage(data);
});

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

async function handleUserMessage(data) {
  console.log("sending data");
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/",
      data,
    });
    if (res.data.status === "success") {
      console.log("email sent");
    }
  } catch (err) {
    console.error("Email sending error", err.message);
  }
}
