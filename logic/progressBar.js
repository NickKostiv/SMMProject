const progressBars = [
  {
    id: "progress-bar-1",
    target: 71,
    message: "Are you ready to post content daily?",
    containerId: "progress-container-1",
    iconId: "check-icon-1",
  },
  {
    id: "progress-bar-2",
    target: 32,
    message: "Do you need help estimating time savings?",
    containerId: "progress-container-2",
    iconId: "check-icon-2",
  },
  {
    id: "progress-bar-3",
    target: 49,
    message: "Would you like to review your preferences?",
    containerId: "progress-container-3",
    iconId: "check-icon-3",
  },
];

let currentBar = 0;

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function startProgress() {
  if (currentBar >= progressBars.length) {
    enableContinueButton();
    return;
  }

  const bar = progressBars[currentBar];
  const element = document.getElementById(bar.id);
  const percentageText = document.getElementById(
    `percentage-${currentBar + 1}`
  );
  const container = document.getElementById(bar.containerId);
  const icon = document.getElementById(bar.iconId);
  const progressText = container.querySelector("p");
  let progress = 0;

  container.classList.add("text-black", "font-semibold");

  const interval = setInterval(() => {
    progress += 1;
    element.style.width = `${progress}%`;
    percentageText.textContent = `${progress}%`;

    if (progress === bar.target) {
      clearInterval(interval);
      showModal(bar.message);

      document.getElementById("modal-yes").onclick = () => {
        closeModal(true);
        continueProgress();
      };
      document.getElementById("modal-no").onclick = () => {
        closeModal(false);
        continueProgress();
      };
    }
  }, 50);
}

function continueProgress() {
  const bar = progressBars[currentBar];
  const element = document.getElementById(bar.id);
  const percentageText = document.getElementById(
    `percentage-${currentBar + 1}`
  );
  const container = document.getElementById(bar.containerId);
  const icon = document.getElementById(bar.iconId);
  const progressText = container.querySelector("p");
  let progress = parseInt(element.style.width);

  const interval = setInterval(() => {
    progress += 1;
    element.style.width = `${progress}%`;
    percentageText.textContent = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);

      icon.classList.remove("hidden");
      icon.classList.add("text-green-500");

      progressText.classList.remove("text-[#8293AC]");
      progressText.classList.add("text-black");

      currentBar++;
      startProgress();
    }
  }, 30);
}

function showModal(message) {
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");
  modalText.textContent = message;
  modal.classList.remove("hidden");
}

function closeModal(answer) {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");

  setCookie(`response-${currentBar + 1}`, answer ? "yes" : "no", 7);
}

function enableContinueButton() {
  const button = document.getElementById("continue-button");
  button.classList.remove(
    "bg-gray-400",
    "cursor-not-allowed",
    "pointer-events-none"
  );
  button.classList.add("bg-gray-900", "cursor-pointer");
}

startProgress();
