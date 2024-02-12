"use strict";
// DOM selector:
const contactForm = document.querySelector("#contact-form");
const contactFormName = document.querySelector("#contact-name");
const contactFormEmail = document.querySelector("#contact-email");
const contactFormMessage = document.querySelector("#contact-message");

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
    window.scrollTo({
      top: chaptersArr[i].offsetTop - offset,
      behavior: "smooth",
    });
  })
);

// send contact emails
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    name: contactFormName.value,
    email: contactFormEmail.value,
    message: contactFormMessage.value,
  };
  cleanQuestionform();
  handleUserMessage(data);
});

// header style change
window.addEventListener("scroll", updateHeaderStyle);

// activate lottie animations
const conversationPath = "/files/therapy.json";
const treePath = "/files/tree.json";
const loaderPath = "/files/loader.json";

const conversation = document.querySelector("#lottie-conversation");
const tree = document.querySelector("#lottie-tree");
const loader = document.querySelector(".contact-section__loader");
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
lottie.loadAnimation({
  container: loader,
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: loaderPath,
});

function updateHeaderStyle() {
  const header = document.querySelector("header");
  if (window.scrollY > 0) header.classList.add("scrolled-header");
  else header.classList.remove("scrolled-header");
}

async function handleUserMessage(data) {
  try {
    showLoader(true);
    // data field name can't be changed
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/",
      data,
    });
    if (res.data.status === "success") {
      planeAnimation();
    }
  } catch (err) {
    console.error("Email sending error", err.message);
  } finally {
    showLoader(false);
  }
}

function cleanQuestionform() {
  contactFormName.value = "";
  contactFormEmail.value = "";
  contactFormMessage.value = "";
}

function planeAnimation() {
  const planePath = "/files/plane9.json";
  const planeBox = document.querySelector(".message-plane");
  const container = document.createElement("div");
  container.id = "lottie-plane";
  planeBox.insertAdjacentElement("afterBegin", container);
  const animation = lottie.loadAnimation({
    container,
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: planePath,
  });
  animation.addEventListener("complete", () =>
    // Remove the Lottie container from the DOM
    container.remove()
  );
}

function showLoader(bool) {
  const btn = document.querySelector(".contact-section__send-btn");
  const loader = document.querySelector(".contact-section__loader");
  btn.style.display = bool ? "none" : "block";
  loader.style.display = bool ? "block" : "none";
}
