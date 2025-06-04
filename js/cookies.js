document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookies-banner");
  const button = document.getElementById("accept-cookies");

  // Проверяем, есть ли кука
  if (!document.cookie.includes("cookiesAccepted=true")) {
    banner.style.display = "block";
  }

  button.addEventListener("click", () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    document.cookie = `cookiesAccepted=true; expires=${date.toUTCString()}; path=/`;

    banner.style.display = "none";
  });
});
