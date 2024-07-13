"use strict";

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * navbar toggle
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * header sticky & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
};

addEventOnElem(window, "scroll", headerSticky);

// p1

/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
};

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

/**
 * bubble animation
 */

document.addEventListener("click", createBubble);

function createBubble(event) {
  const bubble = document.createElement("div");
  bubble.className = "bubble";

  // Set initial position of bubble at event coordinates
  const pageX = event.pageX;
  const pageY = event.pageY;

  bubble.style.left = pageX - 100 + "px"; // Adjust to center the bubble on click
  bubble.style.top = pageY - 100 + "px"; // Adjust to center the bubble on click

  // Add span elements as per the design
  for (let i = 0; i < 5; i++) {
    const span = document.createElement("span");
    bubble.appendChild(span);
  }

  document.body.appendChild(bubble);

  // Generate mostly upward movement for the bubble
  const endX = pageX + (Math.random() * 100 - 50); // Random horizontal displacement
  const endY = pageY - Math.random() * window.innerHeight; // Mostly upward

  const duration = Math.random() * 5000 + 2000; // Random duration between 2 to 7 seconds

  const startTime = performance.now();

  function animateBubble(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const x = pageX + (endX - pageX) * progress;
    const y = pageY + (endY - pageY) * progress;

    bubble.style.left = x - 100 + "px"; // Adjust to center the bubble
    bubble.style.top = y - 100 + "px"; // Adjust to center the bubble

    if (progress < 1) {
      requestAnimationFrame(animateBubble);
    } else {
      bubble.remove(); // Remove bubble after it completes its flight
    }
  }

  requestAnimationFrame(animateBubble);
}
