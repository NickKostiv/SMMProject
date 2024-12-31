const options = document.getElementById("options");
const hiddenInput = document.getElementById("hiddenInput");
const nextButton = document.getElementById("nextButton");

function updateNextButton(isOptionSelected) {
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
  document.querySelectorAll(".option").forEach(option => {
    option.classList.remove("bg-[#00c891]", "text-white");
    option.classList.add("bg-gray-100", "text-[#535c6e]");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedValue = getCookie(`selectedOptions-${pageId}`);
  let isOptionSelected = false;

  resetOptions();

  if (savedValue) {
    const selectedOption = Array.from(
      document.querySelectorAll(".option")
    ).find(option => option.dataset.value === JSON.parse(savedValue));

    if (selectedOption) {
      selectedOption.classList.add("bg-[#00c891]", "text-white");
      selectedOption.classList.remove("bg-gray-100", "text-[#535c6e]");
      hiddenInput.value = JSON.parse(savedValue);
      isOptionSelected = true;
    }
  } else {
    const firstOption = document.querySelector(".option");
    if (firstOption) {
      firstOption.classList.add("bg-[#00c891]", "text-white");
      firstOption.classList.remove("bg-gray-100", "text-[#535c6e]");
      hiddenInput.value = firstOption.dataset.value;
      isOptionSelected = true;
    }
  }

  updateNextButton(isOptionSelected);
});

options.addEventListener("click", e => {
  if (e.target.closest(".option")) {
    const option = e.target.closest(".option");

    resetOptions();

    option.classList.remove("bg-gray-100", "text-[#535c6e]");
    option.classList.add("bg-[#00c891]", "text-white");

    const selectedValue = option.dataset.value;

    hiddenInput.value = selectedValue;

    updateNextButton(true);
  }
});

nextButton.addEventListener("click", () => {
  const selectedValue = hiddenInput.value;
  if (selectedValue) {
    setCookie(`selectedOptions-${pageId}`, selectedValue, 1);

    window.location.href = "page-23.html";
  }
});

function toggleActive(button, event) {
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(btn => {
    btn.classList.remove("active-button");
    const filterSpan = btn.querySelector(".filter-span");
    if (filterSpan) {
      filterSpan.style.background = "rgba(231, 227, 215, 0.5)";
    }
  });

  button.classList.add("active-button");
  const activeFilterSpan = button.querySelector(".filter-span");
  if (activeFilterSpan) {
    activeFilterSpan.style.background = "transparent";
  }

  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const ripple = document.createElement("span");

  ripple.style.position = "absolute";
  ripple.style.borderRadius = "50%";
  ripple.style.width = ripple.style.height = `${
    Math.max(rect.width, rect.height) * 2
  }px`;
  ripple.style.left = `${x - Math.max(rect.width, rect.height)}px`;
  ripple.style.top = `${y - Math.max(rect.width, rect.height)}px`;
  ripple.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  ripple.style.transform = "scale(0)";
  ripple.style.opacity = "0.75";
  ripple.style.animation = "ripple 1s ease-out";

  button.appendChild(ripple);

  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
}
