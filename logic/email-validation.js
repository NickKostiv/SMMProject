function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    JSON.stringify(value)
  )}; expires=${date.toUTCString()}; path=/`;
}

const inputValue = document.getElementById("inputValue");
const nextButton = document.getElementById("nextButton");

const pageId = "page-30";

function updateNextButton(isInputValid) {
  if (isInputValid) {
    nextButton.style.backgroundColor = "rgb(2, 8, 45)";
    nextButton.classList.remove("cursor-not-allowed");
    nextButton.classList.add("cursor-pointer");
    nextButton.disabled = false;
  } else {
    nextButton.style.backgroundColor = "#e0e0e0";
    nextButton.classList.add("cursor-not-allowed");
    nextButton.classList.remove("cursor-pointer");
    nextButton.disabled = true;
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Регулярний вираз для перевірки email
  return emailRegex.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedValue = getCookie(`inputValue-${pageId}`);

  if (savedValue) {
    inputValue.value = JSON.parse(savedValue);
    if (validateEmail(inputValue.value)) {
      updateNextButton(true);
    } else {
      updateNextButton(false);
    }
  } else {
    updateNextButton(false);
  }
});

inputValue.addEventListener("input", () => {
  const value = inputValue.value.trim();

  // Перевірка валідності email при кожній зміні
  if (validateEmail(value)) {
    updateNextButton(true);
  } else {
    updateNextButton(false);
  }
});

nextButton.addEventListener("click", () => {
  const value = inputValue.value.trim();
  if (validateEmail(value)) {
    setCookie(`inputValue-${pageId}`, value, 1);

    window.location.href = "page-31.html";
  }
});
