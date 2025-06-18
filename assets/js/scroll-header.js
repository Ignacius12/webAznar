let lastScrollY = window.scrollY;
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll <= 0) {
    // 🎉 Estás arriba del todo, ¡mostramos el menú siempre!
    header.style.transform = "translateY(0)";
  } else if (currentScroll > lastScrollY) {
    // 🔽 Bajando: ocultar el menú
    header.style.transform = "translateY(-100%)";
  } else {
    // 🔼 Subiendo: mostrar el menú
    header.style.transform = "translateY(0)";
  }

  lastScrollY = currentScroll;
});