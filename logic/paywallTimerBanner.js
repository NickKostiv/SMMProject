// Запуск таймера для обох елементів
function startCountdown(durationInMinutes, displayElements) {
  let timerEndTime = localStorage.getItem("timerEndTime");

  if (!timerEndTime) {
    timerEndTime = Date.now() + durationInMinutes * 60 * 1000;
    localStorage.setItem("timerEndTime", timerEndTime);
  } else {
    timerEndTime = parseInt(timerEndTime, 10);
  }

  function updateTimer() {
    const currentTime = Date.now();
    const remainingTime = Math.max(
      0,
      Math.floor((timerEndTime - currentTime) / 1000)
    );

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    displayElements.forEach(element => {
      element.innerHTML = `
  <div class="flex items-baseline">
    <span class="text-[20px] font-semibold leading-[24px] tracking-[-0.02em]">
      ${String(minutes).padStart(2, "0")}
    </span>
    <span class="text-[14px] font-semibold leading-[24px] tracking-[-0.02em] ml-[2px]">
      m
    </span>
    <span class="text-[20px] font-semibold leading-[24px] tracking-[-0.02em] mx-[5px]">
      :
    </span>
    <span class="text-[20px] font-semibold leading-[24px] tracking-[-0.02em]">
      ${String(seconds).padStart(2, "0")}
    </span>
    <span class="text-[14px] font-semibold leading-[24px] tracking-[-0.02em] ml-[2px]">
      s
    </span>
  </div>
`;
    });

    if (remainingTime === 0) {
      clearInterval(timerInterval);
      localStorage.removeItem("timerEndTime");
    }
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

// Логіка показу/ховання банера
function handleBannerVisibility() {
  const scrollStart = document.getElementById("scroll-banner-start");
  const banner = document.getElementById("fixed-banner");

  const scrollStartTop = scrollStart.getBoundingClientRect().top;

  if (scrollStartTop <= 0) {
    banner.classList.remove("hidden");
    banner.classList.add("visible");
  } else {
    banner.classList.remove("visible");
    banner.classList.add("hidden");
  }
}

const countdownElement = document.getElementById("countdown");
const bannerTimerElement = document.getElementById("banner-timer");

startCountdown(15, [countdownElement, bannerTimerElement]);

window.addEventListener("scroll", handleBannerVisibility);

handleBannerVisibility();
