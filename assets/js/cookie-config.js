// Configuración del Banner de Cookies
window.COOKIE_CONFIG = {
  // Texto del banner
  bannerText: "Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra política de cookies.",
  
  // Enlace a la política de cookies
  policyUrl: "/es/legal/uso-cookies.html",
  
  // Texto de los botones
  acceptButtonText: "Aceptar",
  rejectButtonText: "Rechazar",
  
  // Colores personalizables
  colors: {
    background: "rgba(20, 20, 20, 0.95)",
    text: "#ffffff",
    link: "#4CAF50",
    acceptButton: "#4CAF50",
    rejectButton: "#666666"
  },
  
  // Configuración de Google Analytics
  analytics: {
    enabled: true,
    measurementId: "G-XXXXXXXXXX", // Reemplazar con tu ID real
    anonymizeIp: true,
    secureCookies: true
  },
  
  // Comportamiento
  behavior: {
    showOnFirstVisit: true,
    rememberDecision: true,
    autoHide: false,
    position: "bottom" // "bottom", "top", "center"
  },
  
  // Personalización del enlace
  linkText: "política de cookies",
  linkTarget: "_blank", // "_blank", "_self"
  
  // Mensajes de consola para debugging
  debug: false
};

// Función para obtener configuración
function getCookieConfig() {
  return window.COOKIE_CONFIG || {};
}

// Función para personalizar el banner
function customizeCookieBanner() {
  const config = getCookieConfig();
  
  // Aplicar colores personalizados
  if (config.colors) {
    const style = document.createElement('style');
    style.textContent = `
      .cookie-banner {
        background: ${config.colors.background} !important;
        color: ${config.colors.text} !important;
      }
      .cookie-link {
        color: ${config.colors.link} !important;
      }
      .btn-cookie.aceptar {
        background-color: ${config.colors.acceptButton} !important;
      }
      .btn-cookie.rechazar {
        background-color: ${config.colors.rechazar} !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Aplicar posición personalizada
  if (config.behavior && config.behavior.position !== "bottom") {
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
      banner.style.bottom = 'auto';
      if (config.behavior.position === "top") {
        banner.style.top = '0';
      } else if (config.behavior.position === "center") {
        banner.style.top = '50%';
        banner.style.transform = 'translateY(-50%)';
      }
    }
  }
}

// Ejecutar personalización cuando se carga la página
document.addEventListener('DOMContentLoaded', customizeCookieBanner);
