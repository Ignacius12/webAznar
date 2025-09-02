// Sistema de Cookies y Analytics
document.addEventListener("DOMContentLoaded", () => {
  // Verificar si ya se tomó una decisión sobre las cookies
  const cookiesDecision = localStorage.getItem("cookies_decision");
  
  if (!cookiesDecision) {
    // Mostrar banner de cookies
    mostrarBannerCookies();
  } else if (cookiesDecision === "aceptadas") {
    // Si ya se aceptaron, cargar analytics
    cargarAnalytics();
  }
  // Si se rechazaron, no hacer nada
});

// Función para mostrar el banner de cookies
function mostrarBannerCookies() {
  const config = getCookieConfig();
  
  // Crear el banner
  const banner = document.createElement("div");
  banner.id = "cookie-banner";
  banner.className = "cookie-banner";
  
  // Usar configuración personalizada o valores por defecto
  const bannerText = config.bannerText || "Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra política de cookies.";
  const policyUrl = config.policyUrl || "/es/legal/uso-cookies.html";
  const linkText = config.linkText || "política de cookies";
  const linkTarget = config.linkTarget || "_blank";
  const acceptText = config.acceptButtonText || "Aceptar";
  const rejectText = config.rejectButtonText || "Rechazar";
  
  banner.innerHTML = `
    <p>${bannerText.replace('política de cookies', `<a href="${policyUrl}" class="cookie-link" target="${linkTarget}">${linkText}</a>`)}</p>
    <div class="cookie-buttons">
      <button id="aceptar-cookies" class="btn-cookie aceptar">${acceptText}</button>
      <button id="rechazar-cookies" class="btn-cookie rechazar">${rejectText}</button>
    </div>
  `;
  
  // Agregar el banner al body
  document.body.appendChild(banner);
  
  // Eventos de los botones
  document.getElementById("aceptar-cookies").addEventListener("click", () => {
    localStorage.setItem("cookies_decision", "aceptadas");
    localStorage.setItem("cookies_timestamp", Date.now().toString());
    document.getElementById("cookie-banner").remove();
    cargarAnalytics(); // Solo cargar analytics si se aceptan
  });
  
  document.getElementById("rechazar-cookies").addEventListener("click", () => {
    localStorage.setItem("cookies_decision", "rechazadas");
    localStorage.setItem("cookies_timestamp", Date.now().toString());
    document.getElementById("cookie-banner").remove();
    // No cargar analytics si se rechazan
  });
}

// Función para cargar Google Analytics solo si se aceptan las cookies
function cargarAnalytics() {
  // Verificar que realmente se aceptaron las cookies
  if (localStorage.getItem("cookies_decision") !== "aceptadas") {
    return; // No cargar si no se aceptaron
  }
  
  const config = getCookieConfig();
  
  // Verificar si analytics está habilitado
  if (!config.analytics || !config.analytics.enabled) {
    return;
  }
  
  // ID de Google Analytics desde la configuración o valor por defecto
  const GA_MEASUREMENT_ID = config.analytics.measurementId || 'G-XXXXXXXXXX';
  
  // Cargar gtag
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);
  
  script.onload = function() {
    // Configurar gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      anonymize_ip: config.analytics.anonymizeIp !== false, // Protección de privacidad
      cookie_flags: config.analytics.secureCookies ? 'SameSite=None;Secure' : undefined // Cookies seguras
    });
    
    // Eventos de página
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_category: getPageCategory()
    });
    
    // Eventos de interacción
    setupEventTracking(gtag);
  };
}

// Función para determinar la categoría de la página
function getPageCategory() {
  const path = window.location.pathname;
  
  if (path.includes('/producto/')) return 'producto';
  if (path.includes('/contract/')) return 'contract';
  if (path.includes('/quienes-somos/')) return 'empresa';
  if (path.includes('/por-que-aznar/')) return 'empresa';
  if (path.includes('/sostenibilidad/')) return 'sostenibilidad';
  if (path.includes('/contacto')) return 'contacto';
  if (path === '/es/' || path === '/es') return 'inicio';
  
  return 'otras';
}

// Configurar tracking de eventos
function setupEventTracking(gtag) {
  // Eventos de clic en enlaces
  document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      gtag('event', 'click', {
        link_url: e.target.href,
        link_text: e.target.textContent,
        page_title: document.title
      });
    }
  });
  
  // Eventos de formulario
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function() {
      gtag('event', 'form_submit', {
        form_name: form.getAttribute('name') || 'contact_form',
        page_title: document.title
      });
    });
  });
  
  // Eventos de video
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.addEventListener('play', function() {
      gtag('event', 'video_play', {
        video_title: document.title,
        page_title: document.title
      });
    });
  });
  
  // Eventos de scroll
  let scrollDepth = 0;
  window.addEventListener('scroll', function() {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > scrollDepth && scrollPercent % 25 === 0) {
      scrollDepth = scrollPercent;
      gtag('event', 'scroll', {
        scroll_depth: scrollPercent,
        page_title: document.title
      });
    }
  });
  
  // Tiempo en página
  let startTime = Date.now();
  window.addEventListener('beforeunload', function() {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    gtag('event', 'timing_complete', {
      name: 'page_view',
      value: timeOnPage,
      page_title: document.title
    });
  });
}

// Función para cambiar preferencias de cookies (disponible globalmente)
window.cambiarPreferenciasCookies = function() {
  // Eliminar decisión previa
  localStorage.removeItem("cookies_decision");
  localStorage.removeItem("cookies_timestamp");
  
  // Mostrar banner nuevamente
  if (!document.getElementById("cookie-banner")) {
    mostrarBannerCookies();
  }
};

// Función para verificar estado de cookies (disponible globalmente)
window.getCookieStatus = function() {
  const decision = localStorage.getItem("cookies_decision");
  const timestamp = localStorage.getItem("cookies_timestamp");
  
  if (!decision) return "no_decision";
  
  return {
    decision: decision,
    timestamp: timestamp ? new Date(parseInt(timestamp)) : null
  };
};
