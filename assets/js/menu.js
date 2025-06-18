// --- Menú móvil toggle ---
const menuIcon = document.getElementById('menu-icon');
const nav = document.querySelector('nav');
const submenuParents = document.querySelectorAll('.has-submenu');

// Abrir/cerrar el menú hamburguesa
menuIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  nav.classList.toggle('open');
});

// Manejar submenús en móvil por click
submenuParents.forEach(parent => {
  const link = parent.querySelector('a');
  const submenu = parent.querySelector('.submenu');

  // ✅ En móvil: hacer clic en el link principal despliega el submenú
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && submenu) {
      e.preventDefault(); // 🛑 Evita que navegue
      e.stopPropagation();

      // Cerrar otros submenús
      submenuParents.forEach(item => {
        if (item !== parent) {
          item.classList.remove('open');
        }
      });

      // Abrir/cerrar este submenú
      parent.classList.toggle('open');
    }
    // En escritorio, se deja el comportamiento natural
  });
});

// Cerrar menú y submenús al hacer clic fuera en móvil
document.addEventListener('click', () => {
  if (window.innerWidth <= 768) {
    nav.classList.remove('open');
    submenuParents.forEach(item => item.classList.remove('open'));
  }
});

// Botón de sonido para video (opcional)
document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('teamVideo');
  const toggleBtn = document.getElementById('toggle-sound');

  if (video && toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      toggleBtn.textContent = video.muted ? 'Activar sonido' : 'Silenciar';
    });
  }
});
