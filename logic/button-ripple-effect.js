function toggleActive(button, event) {
  const buttons = document.querySelectorAll("#options button rippleBtn");
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
