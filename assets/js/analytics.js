// 💖 Mostrar banner solo si no hay elección previa
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("cookies_aceptadas")) {
    const style = document.createElement("style");
    style.innerHTML = `
      .cookie-banner {
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: rgba(20, 20, 20, 0.85);
        backdrop-filter: blur(10px);
        color: #fff;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 16px;
        line-height: 1.5;
      }

      .cookie-banner p {
        margin: 0;
      }

      .cookie-link {
        color: #f1f1f1;
        text-decoration: underline;
      }

      .cookie-buttons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }

      .btn-cookie {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s ease;
      }

      .btn-cookie.aceptar {
        background-color: rgb(26, 232, 88);
        color: white;
      }

      .btn-cookie.aceptar:hover {
        background-color: rgb(12, 215, 66);
      }

      .btn-cookie.rechazar {
        background-color: #444;
        color: white;
      }

      .btn-cookie.rechazar:hover {
        background-color: #666;
      }
    `;
    document.head.appendChild(style);

    // Crear el banner de cookies
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.innerHTML = `
      <p>Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra <a href="/es/legal/uso-cookies.html" class="cookie-link">política de cookies</a>.</p>
      <div class="cookie-buttons">
        <button id="aceptar-cookies" class="btn-cookie aceptar">Aceptar</button>
        <button id="rechazar-cookies" class="btn-cookie rechazar">Rechazar</button>
      </div>
    `;
    document.body.appendChild(banner);

    // Eventos de los botones
    document.getElementById("aceptar-cookies").onclick = () => {
      localStorage.setItem("cookies_aceptadas", "true");
      document.getElementById("cookie-banner").remove();
      cargarAnalytics(); // ✅ Solo si acepta, lo cargamos
    };

    document.getElementById("rechazar-cookies").onclick = () => {
      localStorage.setItem("cookies_aceptadas", "false");
      document.getElementById("cookie-banner").remove();
    };
  } else if (localStorage.getItem("cookies_aceptadas") === "true") {
    // Ya aceptó anteriormente
    cargarAnalytics();
  }
});

// 🧠 Cargar Google Analytics solo si se acepta
function cargarAnalytics() {
  // Reemplaza GA_MEASUREMENT_ID con tu ID real de Google Analytics
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
  
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  script.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': 'page_category',
        'custom_parameter_2': 'user_type'
      }
    });

    // Eventos personalizados para SEO
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_category: getPageCategory()
    });

    // Eventos de interacción del usuario
    document.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        gtag('event', 'click', {
          link_url: e.target.href,
          link_text: e.target.textContent,
          page_title: document.title
        });
      }
    });

    // Eventos de scroll para engagement
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

    // Eventos de tiempo en página
    let startTime = Date.now();
    window.addEventListener('beforeunload', function() {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      gtag('event', 'timing_complete', {
        name: 'page_view',
        value: timeOnPage,
        page_title: document.title
      });
    });

    // Eventos de formulario
    trackFormSubmissions();
    
    // Eventos de video
    trackVideoInteractions();
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

// Eventos de formulario
function trackFormSubmissions() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function() {
      if (window.gtag) {
        gtag('event', 'form_submit', {
          form_name: form.getAttribute('name') || 'contact_form',
          page_title: document.title
        });
      }
    });
  });
}

// Eventos de video
function trackVideoInteractions() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.addEventListener('play', function() {
      if (window.gtag) {
        gtag('event', 'video_play', {
          video_title: document.title,
          page_title: document.title
        });
      }
    });
  });
}
