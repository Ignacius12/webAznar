document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector('#awards .btn-explore-black');
  const hiddenSection = document.getElementById('awards-expandible');

  if (toggleButton && hiddenSection) {
    toggleButton.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Mostrar/ocultar la sección
      const isHidden = hiddenSection.style.display === 'none' || hiddenSection.style.display === '';
      hiddenSection.style.display = isHidden ? 'block' : 'none';
      
      // Cambiar el texto del botón
      this.textContent = isHidden ? 'Ocultar premios ←' : 'Ver premios →';
      
      // Si se está mostrando la sección, añadir clase para animación y desplazar
      if (isHidden) {
        // Añadir clase para la animación
        setTimeout(() => {
          hiddenSection.classList.add('show');
        }, 50);
        
        // Esperar un momento para que la sección se muestre antes de desplazar
        setTimeout(() => {
          // Calcular la posición de la sección expandida
          const sectionPosition = hiddenSection.offsetTop;
          
          // Desplazar la página suavemente hacia la sección
          window.scrollTo({
            top: sectionPosition - 100, // 100px de margen superior
            behavior: 'smooth'
          });
        }, 100);
      } else {
        // Si se está ocultando, quitar la clase de animación
        hiddenSection.classList.remove('show');
      }
    });
  }
});
