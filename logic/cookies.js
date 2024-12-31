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

function initializeInputPage(inputId, nextButtonId, pageId, nextPageUrl) {
  const inputValue = document.getElementById(inputId);
  const nextButton = document.getElementById(nextButtonId);

  function updateNextButton(isInputValid) {
    if (isInputValid) {
      nextButton.classList.remove(
        "bg-gray-300",
        "text-gray-500",
        "cursor-not-allowed"
      );
      nextButton.classList.add(
        "bg-[rgb(2,8,45)]",
        "text-white",
        "cursor-pointer"
      );
      nextButton.disabled = false;
    } else {
      nextButton.classList.add(
        "bg-gray-300",
        "text-gray-500",
        "cursor-not-allowed"
      );
      nextButton.classList.remove(
        "bg-[rgb(2,8,45)]",
        "text-white",
        "cursor-pointer"
      );
      nextButton.disabled = true;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const savedValue = getCookie(`inputValue-${pageId}`);
    if (savedValue) {
      inputValue.value = JSON.parse(savedValue);
      updateNextButton(true);
    }
  });

  inputValue.addEventListener("input", () => {
    const value = inputValue.value.trim();
    if (value && !isNaN(value) && Number(value) > 0) {
      updateNextButton(true);
    } else {
      updateNextButton(false);
    }
  });

  nextButton.addEventListener("click", () => {
    const value = inputValue.value.trim();
    if (value) {
      setCookie(`inputValue-${pageId}`, value, 1);
      window.location.href = nextPageUrl;
    }
  });
}

function initializePage(
  optionsId,
  hiddenInputId,
  nextButtonId,
  pageId,
  nextPageUrl,
  isCheckboxMode = false
) {
  const options = document.getElementById(optionsId);
  const hiddenInput = hiddenInputId
    ? document.getElementById(hiddenInputId)
    : null;
  const nextButton = document.getElementById(nextButtonId);

  function updateNextButton() {
    let isOptionSelected = false;

    if (isCheckboxMode) {
      isOptionSelected =
        document.querySelectorAll(`#${optionsId} input:checked`).length > 0;
    } else if (hiddenInput) {
      isOptionSelected = hiddenInput.value !== "";
    }

    if (isOptionSelected) {
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

  function resetOptions() {
    if (!isCheckboxMode) {
      document.querySelectorAll(`#${optionsId} .option`).forEach(option => {
        option.classList.remove("bg-[#00c891]", "text-white");
        option.classList.add("bg-gray-100", "text-[#535c6e]");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const savedValue = getCookie(`selectedOptions-${pageId}`);

    if (isCheckboxMode) {
      if (savedValue) {
        const selectedOptions = JSON.parse(savedValue);
        document.querySelectorAll(`#${optionsId} input`).forEach(input => {
          if (selectedOptions.includes(input.value)) {
            input.checked = true;
          }
        });
      }
    } else {
      resetOptions();
      if (savedValue && hiddenInput) {
        const selectedOption = Array.from(
          document.querySelectorAll(`#${optionsId} .option`)
        ).find(option => option.dataset.value === JSON.parse(savedValue));

        if (selectedOption) {
          selectedOption.classList.add("bg-[#00c891]", "text-white");
          selectedOption.classList.remove("bg-gray-100", "text-[#535c6e]");
          hiddenInput.value = JSON.parse(savedValue);
        }
      }
    }
    updateNextButton();
  });

  if (isCheckboxMode) {
    document.querySelectorAll(`#${optionsId} input`).forEach(input => {
      input.addEventListener("change", () => updateNextButton());
    });
  } else {
    options.addEventListener("click", e => {
      if (e.target.closest(".option")) {
        const option = e.target.closest(".option");

        resetOptions();

        option.classList.remove("bg-gray-100", "text-[#535c6e]");
        option.classList.add("bg-[#00c891]", "text-white");

        const selectedValue = option.dataset.value;
        if (hiddenInput) {
          hiddenInput.value = selectedValue;
        }

        updateNextButton();
      }
    });
  }

  nextButton.addEventListener("click", () => {
    if (isCheckboxMode) {
      const selectedValues = Array.from(
        document.querySelectorAll(`#${optionsId} input:checked`)
      ).map(input => input.value);

      if (selectedValues.length > 0) {
        setCookie(`selectedOptions-${pageId}`, selectedValues, 1);
        window.location.href = nextPageUrl;
      }
    } else if (hiddenInput) {
      const selectedValue = hiddenInput.value;
      if (selectedValue) {
        setCookie(`selectedOptions-${pageId}`, selectedValue, 1);
        window.location.href = nextPageUrl;
      }
    }
  });
}
