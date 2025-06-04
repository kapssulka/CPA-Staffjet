import Lenis from "./librarys/lenis.mjs"; // Правильный путь к файлу

//? Scroll

const isIOS = (() => {
  const userAgent = navigator.userAgent;
  const isAppleDevice =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return isAppleDevice && !window.MSStream;
})();

// Создаём переменную lenis, чтобы можно было управлять
let lenis = null;

// Если **НЕ iOS** — инициализируем Lenis и GSAP
if (!isIOS) {
  // Инициализация Lenis
  lenis = new Lenis({
    duration: 1, // Скорость анимации (1.5 = плавнее)
    smooth: true, // Включает плавный скролл
    smoothTouch: true, // Отключаем плавность на тач-устройствах (по желанию)
    easing: (t) => 1 - Math.pow(1 - t, 3), // Более естественное ускорение/замедление
  });

  // Обновляем Lenis в каждом кадре анимации
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// Если **iOS** — отключаем всё
if (isIOS) {
  // Отключаем все ScrollTrigger'ы
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  // Отключаем Lenis (если вдруг он был инициализирован)
  if (lenis && typeof lenis.destroy === "function") {
    lenis.destroy();
  }
}
