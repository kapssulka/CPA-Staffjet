import "./librarys/inputmask.min.js";

document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("tel");

  if (phoneInput) {
    const mask = new Inputmask({
      mask: "+7 (999) 999 99 99",
      placeholder: "X",
      showMaskOnHover: false,
      showMaskOnFocus: true,
      clearMaskOnLostFocus: true,
    });

    mask.mask(phoneInput);

    phoneInput.addEventListener("blur", () => {
      if (!/\d/.test(phoneInput.value)) {
        phoneInput.value = "";
      }
    });

    // изменение цвета если введен текст
    phoneInput.addEventListener("input", () => {
      if (phoneInput.value.replace(/\D/g, "").length > 0) {
        phoneInput.classList.add("_filled");
      } else {
        phoneInput.classList.remove("_filled");
      }
    });
  }
});
