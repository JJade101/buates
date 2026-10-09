// Personal Portfolio - Janzel Jade P. Buates
// This file handles: the mobile menu, the footer year, and the current-section highlight.

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  var navLinks = nav.querySelectorAll("a");

  // ----- Mobile menu -----
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Close the menu after choosing a link
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  // Close the menu with the Escape key and return focus to the button
  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    ) {
      setMenu(false);
      toggle.focus();
    }
  });

  // ----- Footer year -----
  document.getElementById("year").textContent = new Date().getFullYear();

  // ----- Mark the current section in the navigation -----
  if ("IntersectionObserver" in window) {
    var sections = document.querySelectorAll("main section[id]");
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              if (link.getAttribute("href") === "#" + entry.target.id) {
                link.setAttribute("aria-current", "true");
              } else {
                link.removeAttribute("aria-current");
              }
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
});
