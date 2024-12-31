document.addEventListener("DOMContentLoaded", () => {
  const creditCardBtn = document.getElementById("creditCardBtn");
  const creditCardContent = document.getElementById("creditCardContent");
  const otherButtons = document.querySelectorAll("button:not(#creditCardBtn)");
  const submitButton = document.getElementById("nextButton");

  creditCardBtn.classList.add(
    "shadow-[0_0_0_2px_rgba(0,200,145)]",
    "active-button"
  );
  creditCardBtn.classList.remove("grayscale", "opacity-50");

  creditCardContent.style.display = "block";

  otherButtons.forEach(button => {
    button.classList.add("grayscale", "opacity-50");
    button.classList.remove(
      "shadow-[0_0_0_2px_rgba(0,200,145)]",
      "active-button"
    );
    const associatedContent = document.getElementById(
      button.id.replace("Btn", "Content")
    );
    if (associatedContent) {
      associatedContent.style.display = "none";
    }
  });

  if (submitButton) {
    submitButton.style.display = "block";
    submitButton.disabled = false;
    submitButton.style.backgroundColor = "rgb(2, 8, 45)";
    submitButton.classList.remove("cursor-not-allowed");
    submitButton.classList.add("cursor-pointer");
  }

  document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", event => {
      handleButtonClick(button.id.replace("Btn", ""), event);
    });
  });

  updateNextButton();
});

function handleButtonClick(paymentType, event) {
  const buttons = document.querySelectorAll("button:not(.exclude)");
  const dynamicContent = document.getElementById("dynamicContent");

  const appleContent = document.querySelector("#appleContent");
  const creditCardContent = document.querySelector("#creditCardContent");
  const paypalContent = document.querySelector("#paypalContent");

  buttons.forEach(btn => {
    btn.classList.remove(
      "shadow-[0_0_0_2px_rgba(0,200,145)]",
      "grayscale",
      "opacity-50",
      "active-button"
    );
    btn.classList.add("grayscale", "opacity-50");
  });

  const clickedButton = event.target.closest("button");
  clickedButton.classList.add(
    "shadow-[0_0_0_2px_rgba(0,200,145)]",
    "active-button"
  );
  clickedButton.classList.remove("grayscale", "opacity-50");

  appleContent.style.display = "none";
  creditCardContent.style.display = "none";
  paypalContent.style.display = "none";

  if (paymentType === "applePay") {
    appleContent.style.display = "block";
  } else if (paymentType === "creditCard") {
    creditCardContent.style.display = "block";
  } else if (paymentType === "paypal") {
    paypalContent.style.display = "block";
  }
}
const cardInput = document.getElementById("cardNumber");

cardInput.addEventListener("input", event => {
  let value = event.target.value.replace(/\s+/g, "");

  value = value.replace(/(\d{4})/g, "$1 ").trim();

  event.target.value = value;
});

const expiryInput = document.getElementById("cardExpiry");

expiryInput.addEventListener("input", event => {
  let value = event.target.value.replace(/\D+/g, "");

  if (value.length >= 1) {
    const month = parseInt(value.slice(0, 2), 10);
    if (month > 12) {
      value = "12" + value.slice(2);
    }
  }

  if (value.length > 2) {
    value = value.slice(0, 2) + " / " + value.slice(2, 4);
  }

  event.target.value = value;
});

expiryInput.setAttribute("maxlength", 7);

const nextButton = document.getElementById("nextButton");
const formInputs = document.querySelectorAll(
  "input[type='text'], input[type='number'], input[type='email']"
);
const checkbox = document.querySelector("input[type='checkbox']");

function isFormValid() {
  let allValid = true;

  formInputs.forEach(input => {
    if (!input.value.trim()) {
      allValid = false;
    }
  });

  if (!checkbox.checked) {
    allValid = false;
  }

  return allValid;
}

function updateNextButton() {
  if (isFormValid()) {
    nextButton.style.backgroundColor = "rgb(2, 8, 45)";
    nextButton.classList.remove("cursor-not-allowed");
    nextButton.classList.add("cursor-pointer");
    nextButton.disabled = false;
  } else {
    nextButton.style.backgroundColor = "#e0e0e0";
    nextButton.classList.add("cursor-not-allowed");
    nextButton.classList.remove("cursor-pointer");
    nextButton.classList.remove("opacity-50");
    nextButton.disabled = true;
  }
}

formInputs.forEach(input => {
  input.addEventListener("input", updateNextButton);
});

checkbox.addEventListener("change", updateNextButton);

updateNextButton();
