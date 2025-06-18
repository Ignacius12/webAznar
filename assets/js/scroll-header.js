let lastScrollY = window.scrollY;
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    // 🎯 Scroll hacia abajo: ocultar header
    header.style.transform = "translateY(-100%)";
  } else {
    // 🎉 Scroll hacia arriba: mostrar header
    header.style.transform = "translateY(0)";
  }
  lastScrollY = window.scrollY;
});
