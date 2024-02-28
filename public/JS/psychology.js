"use strict";
// DOM selector:
const contactForm = document.querySelector("#contact-form");
const contactFormName = document.querySelector("#contact-name");
const contactFormEmail = document.querySelector("#contact-email");
const contactFormMessage = document.querySelector("#contact-message");
const topicsSwitch = document.querySelector(".checkbox_mark");
const articleBtns = document.querySelectorAll(".articles-section__btn");

// arrays to create top links
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
// array with order of appearance
const appearArr = [
  document.querySelector(".self-section"),
  document.querySelector(".self-section__text-container"),
  document.querySelector(".values-section"),
  ...document.querySelectorAll(".values-section__wrapper"),
  document.querySelector(".topics-section"),
  document.querySelector(".articles-section"),
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

// add Parent-Teenager toggle switch handler
topicsSwitch.addEventListener("click", changeTopics);

// open Dialog for each article buttons
articleBtns.forEach((btn) =>
  btn.addEventListener("click", () => showDialog(btn.dataset.about))
);

// Smooth appearing of the sections:
// Create an Intersection Observer instance
const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: "0px",
  threshold: 0.1, // When 10% of target is visible
});
// Apply observer to each appearing element
appearArr.forEach((section) => observer.observe(section));

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("appear");
      observer.unobserve(entry.target); // Stop observing once shown
    }
  });
}

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
      // url: "http://127.0.0.1:3000/",
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

function showDialog(data) {
  const dialog = document.querySelector(".dialogWindow");
  const title = document.querySelector(".dialog__title");
  const text = document.querySelector(".dialog__text");
  // todo - make separate file
  const conditionsText = `
    <div>Рада пригласить вас на консультации! Прошу ознакомиться с контрактом, 
    который выполняет роль памятки и закрепляет взаимные обязательства.</div>
    <div class='condition-title'>Запрос</div>
    <div>Сессии будут проходить эффективно, если у вас есть конкретный запрос.
    Вы можете подумать перед встречей, что вы хотели бы получить по итогам нашей работы.</div>
    <div class='condition-title'>Что происходит на сессиях</div>
    <div>Я работаю в когнитивно-поведенческой терапии, поэтому наши встречи будут иметь структуру. 
    В начале вы делитесь, что важного произошло на неделе и каким было ваше эмоциональное состояние, затем мы совместно 
    намечаем план на сессию. В ходе встречи мы будем обсуждать ваши чувства, анализировать мысли и действия. Я научу вас 
    техникам, которые вы сможете применять в жизни, постепенно становясь психологом самому себе. Также, если это будет 
    вам полезно, я могу делиться информацией о работе психики. В конце сессии мы выберем подходящее вам домашнее задание, 
    подведем итоги, я запрошу у вас обратную связь - что (не) понравилось, что полезного вы унесете с собой, было ли вам комфортно.</div>
    <div class='condition-title'>Продолжительность консультации</div> 
    <div>Около 60 минут. Периодичность определяем вместе с вами (обычно раз в неделю).</div>
    <div class='condition-title'>Оплата и отмена сессий</div>
  - Вы оплачиваете сессию заранее, минимум за 12 часов до встречи. Можно оплатить как одну, так и 
    несколько консультаций. При оплате пакета из 5 сессий вы получаете скидку. <br>
  - К моему номеру телефона привязаны карты Сбера и Тинькофф (Никольская Ирина Григорьевна). Пришлите 
    мне подтверждение оплаты, и я смогу зарезервировать за вами время в расписании.<br>
  - Если необходимо отменить сессию, предупредите меня за 12 часов до ее начала, тогда ваша оплата 
    переносится на следующий раз.<br>
  - Если в день встречи вы не предупредили и не пришли, стоимость сессии списывается. Если я не 
    предупредила и не пришла, проведу оплаченную консультацию плюс еще одну бесплатно.<br>
  - Я предупреждаю заранее о своем отпуске.<br>
    <div class='condition-title'>Опоздания</div>
    <div>Сессии в онлайне начинаются в назначенное время. Если по каким-то причинам я должна буду 
    задержаться, то предупрежу вас. Мы либо перенесем сессию, либо сдвинем ее, и встреча продлится 
    столько времени, сколько запланировано. Если опаздываете вы, желательно предупредить меня. Тогда 
    я смогу поискать возможность перенести сессию или сдвинуть ее. А если предупредить не получилось, 
    наша встреча будет короче на время вашего опоздания.
    <div class='condition-title'>Конфиденциальность</div><div>Все обсуждаемое на сессиях, а также 
    записи, которые я веду, не выносятся без вашего письменного разрешения никогда и никуда за 
    исключением случаев, когда речь идет об угрозе здоровью и жизни для вас или других лиц.</div>`;
  const firstText = " ";
  dialog.showModal();
  if (data == "conditions") {
    title.innerHTML = "Условия работы";
    text.innerHTML = conditionsText;
  }
  if (data == "first") {
    title.innerHTML = "Как проходит первая сессия";
    text.innerHTML = firstText;
  }
  dialog.addEventListener("click", () => {
    dialog.close();
  });
}
