// VALIDATION FORM
const form = document.getElementById("js-form");
const formButtonWrapper = document.getElementById("js-form-btn");
const formButton = form.querySelector("button");

document.addEventListener("DOMContentLoaded", () => {
  if (form) {
    const name = form.querySelector("#name");
    const tel = form.querySelector("#tel");
    const telegram = form.querySelector("#telegram");
    const checkbox = form.querySelector("#privacy_policy");

    const popup = document.getElementById("js-pop-up");

    // get value
    let nameValue = name.value;
    let telValue = tel.value;
    let telegramValue = telegram.value;
    let checkboxlValue = checkbox.checked;

    formButtonWrapper.addEventListener("click", async () => {
      let isValidateName = validation(name, nameValue, "name");
      let isValidateTel = validation(tel, telValue, "tel");
      let isValidateTelegram = validation(telegram, telegramValue, "telegram");
      let isChecked = validation(checkbox, checkboxlValue, "checkbox");

      if (isValidateName && isValidateTel && isValidateTelegram && isChecked) {
        formButton.disabled = false;

        const formData = new FormData(form);

        //? ТЕСТОВЫЙ КОД ДЛЯ ДЕМОНСТРАЦИИ POP UP ПРИ УСПЕХЕ
        // ЭТОТ КОД НУЖНО УБРАТЬ КОГДА БУДЕТ ПРАВИЛЬНЫЙ ПУТЬ ДЛЯ ОТПРАВКИ fetch
        // -------------------------------------------------------------------
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        popup.style.display = "flex";
        setTimeout(() => {
          document.body.classList.add("_hidden");
          popup.classList.add("_active");
        }, 0);

        form.reset();
        formButton.disabled = true;

        nameValue = "";
        telValue = "";
        telegramValue = "";
        checkboxlValue = "";
        // -------------------------------------------------------------------------

        //? ОТПРАВКА ЗАПРОСА НА СЕРВЕР (раскомментировать и указать правильный путь на файл обработки)
        // try {
        //   const response = await fetch("верный_файл.php", {
        //     method: "POST",
        //     body: formData,
        //   });

        //   if (response.ok) {
        //     popup.style.display = "flex";
        //     setTimeout(() => {
        //       document.body.classList.add("_hidden");
        //       popup.classList.add("_active");
        //     }, 0);

        //     form.reset();
        //     formButton.disabled = true;

        //     nameValue = "";
        //     telValue = "";
        //     telegramValue = "";
        //     checkboxlValue = "";
        //   }
        // } catch (error) {
        //   console.error("Ошибка запроса:", error);
        // }
      } else formButton.disabled = true;
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    // валидация полей
    name.addEventListener("blur", (e) => {
      nameValue = e.target.value;
      validation(name, e.target.value, "name");
    });

    tel.addEventListener("blur", (e) => {
      telValue = e.target.value;

      validation(tel, e.target.value, "tel");
    });

    telegram.addEventListener("blur", (e) => {
      telegramValue = e.target.value;

      validation(telegram, e.target.value, "telegram");
    });

    checkbox.addEventListener("change", (e) => {
      checkboxlValue = e.target.checked;

      validation(checkbox, e.target.checked, "checkbox");
    });

    // валидация на пробелы
    [name, telegram].forEach((item) => {
      item.addEventListener("input", (e) => {
        e.target.value = e.target.value.trim();
      });
    });

    // HELPER
    function validation(input, inputValue = null, rule) {
      const value = inputValue || input.innerText;

      const wrapper = input.closest(".js-required-wrapper-input");

      const errorEl = wrapper.querySelector(".input-form__error");

      if (rule === "name") {
        if (value.length < 2) {
          formButton.disabled = true;
          wrapper.classList.add("_error");
          return false;
        } else {
          formButton.disabled = false;
          wrapper.classList.remove("_error");
          return true;
        }
      }

      if (rule === "tel") {
        if (value.length < 2) {
          formButton.disabled = true;
          wrapper.classList.add("_error");
          errorEl.innerText = "Заполните поле";
          return false;
        } else if (input.value.includes("X")) {
          formButton.disabled = true;
          wrapper.classList.add("_error");
          errorEl.innerText = "Заполните поле правильно";
          return false;
        } else {
          formButton.disabled = false;
          wrapper.classList.remove("_error");
          return true;
        }
      }

      if (rule === "telegram") {
        if (value.length < 2) {
          formButton.disabled = true;
          wrapper.classList.add("_error");
          errorEl.innerText = "Заполните поле";
          return false;
        } else if (input.value.includes("X")) {
          formButton.disabled = true;
          wrapper.classList.add("_error");
          errorEl.innerText = "Заполните поле правильно";
          return false;
        } else {
          formButton.disabled = false;
          wrapper.classList.remove("_error");
          return true;
        }
      }

      if (rule === "checkbox") {
        if (!value) {
          formButton.disabled = true;
          wrapper.classList.add("_error");
          return false;
        } else {
          formButton.disabled = false;
          wrapper.classList.remove("_error");

          return true;
        }
      }
    }
  }
});
