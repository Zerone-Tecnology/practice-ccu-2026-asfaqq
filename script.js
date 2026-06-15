(function () {
  "use strict";

  const header = document.getElementById("header");
  const burger = document.getElementById("burger");
  const nav = document.getElementById("main-nav");
  const form = document.getElementById("registration-form");
  const formMessage = document.getElementById("form-message");

  function onScroll() {
    if (window.scrollY > 50) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  }

  function toggleMenu() {
    const isOpen = nav.classList.toggle("header__nav--open");
    burger.classList.toggle("header__burger--active", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  function closeMenu() {
    nav.classList.remove("header__nav--open");
    burger.classList.remove("header__burger--active");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Открыть меню");
    document.body.style.overflow = "";
  }

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = "form-message form-message--" + type;
  }

  function validateForm() {
    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }
    return true;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger.addEventListener("click", toggleMenu);

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("header__nav--open")) {
      closeMenu();
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
      showMessage("Проверьте правильность заполнения полей.", "error");
      return;
    }

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    console.log("Registration submitted:", payload);

    showMessage(
      "Спасибо! Заявка принята. Подтверждение придёт на " + payload.email + ".",
      "success"
    );
    form.reset();
  });
})();
