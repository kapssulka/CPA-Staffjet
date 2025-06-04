// preloader

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("_hidden");
  const preloader = document.getElementById("preloader");

  const percent1 = document.querySelector(".preloader__text-current-01");
  const percent2 = document.querySelector(".preloader__text-current-01-33");
  const percent3 = document.querySelector(".preloader__text-current-33-65");
  const percent4 = document.querySelector(".preloader__text-current-65-99");
  const percentLast = document.querySelector(".preloader__text-current-100");

  let i = 0;

  percent1.classList.add("_animate");
  setTimeout(() => {
    percent1.classList.remove("_animate");
    percent2.classList.add("_animate");
  }, 600);

  const intervalPreloader = setInterval(() => {
    i++;

    if (i == 1) {
      percent2.classList.add("_animate");
      setTimeout(() => {
        percent2.classList.remove("_animate");
        percent3.classList.add("_animate");
      }, 600);
    }
    if (i == 2) {
      percent3.classList.add("_animate");
      setTimeout(() => {
        percent3.classList.remove("_animate");
        percent4.classList.add("_animate");
      }, 600);
    }

    if (i == 3) {
      percent4.classList.add("_animate");
      setTimeout(() => {
        percent4.classList.remove("_animate");
        percentLast.classList.add("_animate");

        clearInterval(intervalPreloader);
      }, 1200);

      setTimeout(() => {
        document.body.classList.remove("_hidden");
      }, 1600);

      setTimeout(() => {
        preloader.classList.add("_close-animate");
      }, 1800);

      setTimeout(() => {
        preloader.classList.remove("_loading");
        preloader.classList.remove("_close-animate");
      }, 2100);
    }
  }, 600);
});
