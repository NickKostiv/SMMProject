const slider = document.getElementById("slider");
const foreground = document.getElementById("foreground");
let isDragging = false;

function preventScroll(e) {
  e.preventDefault();
}

slider.addEventListener("mousedown", startDrag);
slider.addEventListener("touchstart", startDrag, { passive: false }); // passive: false дозволяє блокувати скрол

document.addEventListener("mouseup", stopDrag);
document.addEventListener("touchend", stopDrag);

document.addEventListener("mousemove", moveSlider);
document.addEventListener("touchmove", moveSlider, { passive: false }); // passive: false дозволяє блокувати скрол

function startDrag(e) {
  isDragging = true;

  document.body.addEventListener("touchmove", preventScroll, {
    passive: false,
  });
}

function stopDrag() {
  isDragging = false;

  document.body.removeEventListener("touchmove", preventScroll);
}

function moveSlider(e) {
  if (!isDragging) return;

  const container = slider.parentElement;
  const rect = container.getBoundingClientRect();
  let newX;

  if (e.touches) {
    newX = e.touches[0].clientX - rect.left;
  } else {
    newX = e.clientX - rect.left;
  }

  newX = Math.max(0, Math.min(newX, rect.width));

  slider.style.left = `${newX}px`;

  const percentage = (newX / rect.width) * 100;
  foreground.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
}
