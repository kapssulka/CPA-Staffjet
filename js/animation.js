const isIOS = (() => {
  const userAgent = navigator.userAgent;
  const isAppleDevice =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return isAppleDevice && !window.MSStream;
})();

if (!isIOS) {
  //? GSAP
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      window.location.reload();
    }, 300);
  });

  gsap.registerPlugin(ScrollTrigger);

  //! HIRO SECTION
  const animateHiroTitle = document.querySelector(".fade-in-hiro-title");
  const animateHiroSunTitle = document.querySelector(".fade-in-hiro-sub-title");
  const animateHiroText = document.querySelector(".fade-in-hiro-text");
  const animateHiroButton = document.querySelector(".fade-in-hiro-button");
  const animateHiroBg = document.querySelector(".fade-in-hiro-bg");
  const animateHiroHeader = document.querySelector(".fade-in-hiro-header");

  animateHiroFadeIn(animateHiroTitle, 3.8, 0.8);
  animateHiroFadeIn(animateHiroSunTitle, 4.3, 0.2, 0, 10);
  animateHiroFadeIn(animateHiroText, 4, 0.2);
  animateHiroFadeIn(animateHiroButton, 4.1, 0.2, 0, 20);

  function animateHiroFadeIn(
    element,
    delay = 3.8,
    duration = 1,
    opacity = 0,
    y = 40,
    start = "top 20%",
    trigger = element
  ) {
    gsap.fromTo(
      element,
      { opacity, y }, // Начальные значения
      {
        opacity: 1, // Конечное значение
        delay: delay,
        y: 0,
        duration: duration,
        scrollTrigger: {
          trigger: ".staffjet", // Этот элемент будет триггером
          start: start, // Когда верх блока окажется на 80% экрана
          toggleActions: "play none none reverse", // Запуск анимации один раз

          onEnterBack: () => {
            // Возвращаем элемент к анимации при обратном входе в зону видимости
            gsap.fromTo(
              element,
              { opacity, y },
              { opacity: 1, y: 0, duration: 0.6, delay: 0.3 }
            );
          },
        },
      }
    );
  }

  // Анимация для .fade-in-hiro-bg
  gsap.fromTo(
    animateHiroBg,
    { scale: 0.8 }, // Начальные значения
    {
      scale: 1,
      delay: 3.8,
      duration: 1.2,
      scrollTrigger: {
        trigger: animateHiroBg,
        start: "top 100%",
        toggleActions: "play none none reverse",
        onEnterBack: () => {
          // Анимация для обратного входа
          gsap.fromTo(
            animateHiroBg,
            {
              scale: 0.8,
            },
            { scale: 1, duration: 1.2, delay: 0.3 }
          );
        },
      },
    }
  );

  let mmHiroSection = gsap.matchMedia();

  mmHiroSection.add("(min-width: 768px)", () => {
    // Анимация для .fade-in-hiro-header
    let animation = gsap.fromTo(
      animateHiroHeader,
      { height: 130 }, // Начальные значения
      {
        height: 0,
        delay: 4,
        duration: 0.8,
        scrollTrigger: {
          trigger: animateHiroHeader,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onEnterBack: () => {
            // Анимация для обратного входа
            gsap.fromTo(
              animateHiroHeader,
              { height: 130 },
              { height: 0, duration: 0.8, delay: 0.3 }
            );
          },
        },
      }
    );

    return () => {
      animation.kill(); // Останавливаем анимацию
      gsap.set(animateHiroHeader, { clearProps: "all" }); // Убираем все инлайн-стили
    };
  });

  //! ABOUT US ANIMATION

  const titleAbouUs = document.querySelector(
    ".fade-in-animation-about-us-title"
  );
  const textAbouUs = document.querySelector(".fade-in-animation-about-us-text");
  const cardstAbouUs = document.querySelector(".fade-in-animation-about-cards");

  const tlAbouUs = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-us__inner",
      start: "top 50%",
      toggleActions: "play none none reverse",
      // markers: true, // можно включить для отладки
    },
  });

  // заголоаок и текст
  tlAbouUs
    .fromTo(
      titleAbouUs,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.3 }
    )
    .fromTo(
      textAbouUs,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.3 }
    );

  gsap.fromTo(
    cardstAbouUs,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
      scrollTrigger: {
        trigger: cardstAbouUs,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );

  //! WEBMASTERS ANIMATION
  const webmastersCard = gsap.utils.toArray(".webmasters__card");

  const tlWebmasters = gsap.timeline({
    scrollTrigger: {
      trigger: ".webmasters__content", // контейнер, когда появляется в зоне видимости
      start: "top 70%", // начальная точка триггера
      toggleActions: "play none none reverse",
      // markers: true              // можно включить для отладки
    },
  });

  webmastersCard.forEach((card, index) => {
    tlWebmasters.fromTo(
      card,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
  });

  //! DEVELOPMENT-PHASE ANIMATION
  const itemsPhase = gsap.utils.toArray(".fade-in-item-phase");

  itemsPhase.forEach((item) => {
    gsap.fromTo(
      item,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  //! CONTACTS ANIMATION

  const contactsBlock = document.querySelector(".fade-in-contacts");

  gsap.fromTo(
    contactsBlock,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
      scrollTrigger: {
        trigger: contactsBlock,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // -------------------------------

  //! BG SCALE ANIMATION

  function scaleAnimationBg(elem) {
    // bg
    return gsap.fromTo(
      elem,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: elem,
          start: "top 30%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  let bgAnimateItems = gsap.utils.toArray(".bg-scale-animation");

  let animations = bgAnimateItems.map((item) => scaleAnimationBg(item));
}
