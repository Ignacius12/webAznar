document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector('#awards .btn-explore-black');
  const hiddenSection = document.getElementById('awards-expandible');

  if (toggleButton && hiddenSection) {
    toggleButton.addEventListener('click', function (e) {
      e.preventDefault();
      hiddenSection.style.display = hiddenSection.style.display === 'none' ? 'block' : 'none';
      this.textContent = hiddenSection.style.display === 'block' ? 'Ocultar premios ←' : 'Ver premios →';
    });
  }
});
