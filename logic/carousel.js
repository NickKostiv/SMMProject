// Carousel page 5
document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("logo");
  const subtitle = document.getElementById("subtitle");
  const text = document.getElementById("text");
  const step1 = document.getElementById("step1");
  const step3 = document.getElementById("step3");

  // Step 1: Зменшення і підняття
  setTimeout(() => {
    logo.style.transform = "scale(0.27) translateY(-300px)";
    subtitle.style.transform = "scale(0.31) translateY(-1080px)";
    text.style.transform = "scale(0.31) translateY(-950px)";
    logo.style.transition = "transform 1s";
    subtitle.style.transition = "transform 1s";
    text.style.transition = "transform 1s";
  }, 1000);

  // Зникнення Step 1
  setTimeout(() => {
    step1.style.opacity = "0";
    step1.style.transition = "opacity 1s";
  }, 2000);

  // Показ Step 3
  setTimeout(() => {
    step3.style.opacity = "1";
    step3.style.transition = "opacity 1s";

    // Ініціалізація Swiper після показу Step 3
    new Swiper(".swiper-container", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
    });
  }, 3000);
});
