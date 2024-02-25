"use strict";
// DOM selector:
const contactForm = document.querySelector("#contact-form");
const contactFormName = document.querySelector("#contact-name");
const contactFormEmail = document.querySelector("#contact-email");
const contactFormMessage = document.querySelector("#contact-message");
const topicsSwitch = document.querySelector(".checkbox_mark");

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
// add parallax to the Topics section
// window.addEventListener("scroll", handleParallax);

// activate lottie animations
const lottieArr = ["therapy", "loader", "leaf"];
const lottieContArr = [
  document.querySelector("#lottie-conversation"),
  document.querySelector(".contact-section__loader"),
  document.querySelector(".lottie-leaves"),
];
// Load the Lottie animations
lottieContArr.forEach((container, i) => {
  lottie.loadAnimation({
    container: container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: `/files/${lottieArr[i]}.json`,
  });
});

// add Parent - Teenager toggle switch handler
topicsSwitch.addEventListener("click", changeTopics);

function updateHeaderStyle() {
  const header = document.querySelector("header");
  const links = document.querySelectorAll(".link");
  if (window.scrollY > 0) {
    header.classList.add("scrolled-header");
    links.forEach((link) => (link.style.color = "black"));
  } else {
    header.classList.remove("scrolled-header");
    links.forEach((link) => (link.style.color = "rgb(132, 132, 132)"));
  }
}

async function handleUserMessage(data) {
  try {
    showLoader(true);
    // data field name can't be changed
    const res = await axios({
      method: "POST",
      // url:
      //   process.env.NODE_ENV === "production"
      //     ? process.env.URL
      //     : "http://127.0.0.1:3000/",
      url: "https://nikolskaya.org/",
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
  // play the plane animation when a letter is sent
  const planePath = "/files/plane.json";
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

function handleParallax() {
  const parallaxMain = document.querySelector(".top-section__photo");
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  // parallax effect coefficient
  const parallaxOffset = scrollTop / 12;
  parallaxMain.style.transform = `translateY(${parallaxOffset}px)`;
}

function changeTopics() {
  const adultText = document.querySelector(".adult");
  const teenText = document.querySelector(".teen");
  const adultTopics = document.querySelector(".adultTopics");
  const teenTopics = document.querySelector(".teenTopics");
  adultTopics.classList.toggle("hidden");
  teenTopics.classList.toggle("hidden");
  adultText.classList.toggle("active-switch");
  teenText.classList.toggle("active-switch");
}
