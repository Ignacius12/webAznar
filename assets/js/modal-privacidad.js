// Espera a que todo el DOM esté listo ✨
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("privacy-modal");
  const openModalLinks = document.querySelectorAll(".open-privacy");
  const closeModal = modal.querySelector(".close");

  // Abre el modal al hacer clic en el enlace
  openModalLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      modal.style.display = "block";
    });
  });

  // Cierra el modal al hacer clic en la X
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cierra el modal al hacer clic fuera de él
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
