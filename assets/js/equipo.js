// ¡Vamos allá con energía positiva! 🎉
document.addEventListener('DOMContentLoaded', () => {
  const boton = document.getElementById('mostrar-equipo');
  const seccion = document.getElementById('imagen-equipo');

  boton.addEventListener('click', () => {
    const estaVisible = seccion.style.display === 'block';

    // Cambia visibilidad
    seccion.style.display = estaVisible ? 'none' : 'block';

    // Cambia texto del botón 🌈
    boton.textContent = estaVisible ? 'Conoce al equipo' : 'Cerrar foto';
  });
});
