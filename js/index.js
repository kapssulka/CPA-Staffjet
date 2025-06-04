// IOS
document.addEventListener("DOMContentLoaded", () => {
  const isIOSforClasses =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isIOSforClasses) {
    document.body.classList.add("_ios");
  }

  // TIME ZONE
  const timezoneSpan = document.getElementById("js-timezone");

  if (timezoneSpan) {
    function updateTime() {
      timezoneSpan.innerText = getTime();
    }

    updateTime();

    // Вычисляем, сколько осталось до следующей минуты
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000;

    setTimeout(() => {
      updateTime();
      setInterval(updateTime, 60000);
    }, msToNextMinute);
  }
  function getTime() {
    const options = {
      timeZone: "Europe/Moscow",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const time = new Date()
      .toLocaleString("ru-RU", options)
      .replace(/^(\d):/, "0$1");

    return time;
  }

  // BURGER MENU

  const burgerBtn = document.getElementById("js-burger");
  const burgerNav = document.getElementById("js-burger-nav");
  const burgerNavLinks = document.querySelectorAll(".js-hide-fixed-header");

  // для устранения перкрытия блока шапкой при сролле к якорю (снизу страницы вверх)
  let isVisibleFixedHeader = true;

  if (burgerBtn) {
    burgerBtn.addEventListener("click", () => {
      if (burgerBtn.classList.contains("_open")) {
        removeBurgerNav();

        burgerBtn.classList.add("_close");

        setTimeout(() => {
          burgerBtn.classList.remove("_close");
        }, 300);
      } else openBurgerNav();
    });
  }

  // links
  if (burgerNavLinks.length > 0) {
    burgerNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const href = link.getAttribute("href");

        if (
          typeof href === "string" &&
          href.startsWith("#") &&
          href.length > 1
        ) {
          const targetElement = document.getElementById(href.slice(1)); // Ищем по ID

          if (!targetElement) {
            console.warn(`Элемент с ID "${href.slice(1)}" не найден.`);
            return;
          }

          removeBurgerNav();
          isVisibleFixedHeader = false;

          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }, 50);

          setTimeout(() => (isVisibleFixedHeader = true), 2000);
        }
      });
    });
  }

  function openBurgerNav() {
    burgerBtn.classList.add("_open");
    burgerNav.classList.add("_open");
    document.body.classList.add("_hidden");
  }
  function removeBurgerNav() {
    burgerBtn.classList.remove("_open");
    burgerNav.classList.remove("_open");
    document.body.classList.remove("_hidden");
  }

  // FIXED HEADER

  const header = document.getElementById("js-header");
  let lastScrollTop = window.scrollY;

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 200 && window.innerWidth < 768) {
        header.classList.add("_fixed");
      } else {
        header.classList.remove("_fixed");
      }
    });
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
      // УБИРАЕМ БУРГЕР НАВИГАЦИЮ
      removeBurgerNav();

      // УБИРАЕМ ФИКСАЦИЮ
      header.classList.remove("_fixed");
    }
  });

  // ANIMATE SERVICES SWIPE

  const servicesCards = document.querySelectorAll("#js-services-card");

  if (servicesCards.length > 0) {
    servicesCards.forEach((card) => {
      const cardButton = card.querySelector(".card-services__button");

      cardButton.addEventListener("click", () => {
        if (card.classList.contains("_open")) {
          card.classList.remove("_open");

          card.classList.add("_close");
          setTimeout(() => {
            card.classList.remove("_close");
          }, 600);
        } else {
          card.classList.add("_open");
        }
      });
    });
  }

  // ACCORDION

  const accordionItems = document.querySelectorAll(".agency-accordion__item");

  if (window.innerWidth <= 1024 || document.body.classList.contains("_ios")) {
    if (accordionItems.length > 0) {
      accordionItems.forEach((item, _, array) => {
        item.addEventListener("click", () => {
          if (item.classList.contains("_active")) return;

          array.forEach((item) => item.classList.remove("_active"));
          item.classList.add("_active");
        });
      });
    }
  }

  // DATA SWITCH

  const buttonFoodRetail = document.getElementById("js-food-retail-button");
  const buttonNonFoodRetail = document.getElementById(
    "js-non-food-retail-button"
  );

  const dataNonFoodRetail = document.querySelectorAll(
    "#js-non-food-retail-data"
  );
  const dataFoodRetail = document.querySelectorAll("#js-food-retail-data");

  if (buttonFoodRetail) {
    buttonFoodRetail.addEventListener("click", () => {
      if (buttonFoodRetail.classList.contains("_active")) return;

      buttonFoodRetail.classList.add("_active");
      buttonNonFoodRetail.classList.remove("_active");

      dataNonFoodRetail.forEach((item) => item.classList.remove("_active"));

      dataFoodRetail.forEach((item) => item.classList.add("_active"));

      // анимация при смене
      if (window.innerWidth > 1020) {
        gsap.fromTo(
          ".animate-cpa-data-card-1",
          { y: "100%" },
          {
            y: 0,
            duration: 0.6,
            delay: 0.2,
          }
        );
        gsap.fromTo(
          ".animate-cpa-data-card-2",
          { y: "100%" },
          {
            y: 0,
            duration: 0.6,
            delay: 0.3,
          }
        );
        gsap.fromTo(
          ".animate-cpa-data-card-3",
          { y: "100%" },
          {
            y: 0,
            duration: 0.6,
            delay: 0.4,
          }
        );
        gsap.fromTo(
          ".animate-cpa-data-card-4",
          { y: "100%" },
          {
            y: 0,
            duration: 0.6,
            delay: 0.5,
          }
        );
      }
    });
  }

  if (buttonNonFoodRetail) {
    buttonNonFoodRetail.addEventListener("click", () => {
      if (buttonNonFoodRetail.classList.contains("_active")) return;

      buttonNonFoodRetail.classList.add("_active");
      buttonFoodRetail.classList.remove("_active");

      dataFoodRetail.forEach((item) => item.classList.remove("_active"));

      dataNonFoodRetail.forEach((item) => item.classList.add("_active"));

      // анимация при смене
      if (window.innerWidth > 1020) {
        gsap.fromTo(
          ".animate-cpa-data-card-1",
          { y: "100%" },
          {
            y: 0,
            duration: 0.6,
            delay: 0.2,
          }
        );
        gsap.fromTo(
          ".animate-cpa-data-card-2",
          { y: "100%" },
          {
            y: 0,
            duration: 0.6,
            delay: 0.3,
          }
        );
        gsap.fromTo(
          ".animate-cpa-data-card-3",
          { y: "100%" },
          {
            y: 0,
            duration: 0.6,
            delay: 0.4,
          }
        );
        gsap.fromTo(
          ".animate-cpa-data-card-4",
          { y: "100%" },
          {
            y: 0,
            duration: 0.6,
            delay: 0.5,
          }
        );
      }
    });
  }

  // POP UP

  const popup = document.getElementById("js-pop-up");
  const popupButton = document.getElementById("js-close-pop-up");

  if (popup) {
    popup.style.display = "none";
    popup.onclick = (e) => {
      e.stopPropagation();

      if (popup === e.target) closePopup();

      if (popupButton.contains(e.target)) closePopup();

      function closePopup() {
        popup.classList.remove("_active");
        document.body.classList.remove("_hidden");
        setTimeout(() => {
          popup.style.display = "none";
        }, 200);
      }
    };
  }

  // исправление проблеммы с переходом на главную к якорю (с жругих страниц)
  window.addEventListener("load", function () {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);

      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "auto" });
        }, 1000);
      }
    }
  });
});
