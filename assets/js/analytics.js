// 💖 Mostrar banner solo si no hay elección previa
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("cookies_aceptadas")) {
    // 🔧 Calcular la ruta correcta al archivo de cookies
    const currentPath = window.location.pathname;
    let cookiePath = "";
    
    // Determinar la ruta relativa basada en la ubicación actual
    if (currentPath.includes("/es/")) {
      // Si estamos en una subcarpeta de /es/
      const depth = currentPath.split("/").length - 3; // -3 porque /es/ cuenta como 2 niveles
      cookiePath = "../".repeat(depth) + "legal/uso-cookies.html";
    } else if (currentPath === "/es/" || currentPath === "/es/index.html") {
      // Si estamos en la raíz de /es/
      cookiePath = "legal/uso-cookies.html";
    } else {
      // Fallback para otras ubicaciones
      cookiePath = "es/legal/uso-cookies.html";
    }

    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.innerHTML = `
      <div id="cookie-banner" class="cookie-banner">
            <p>
                Utilizamos cookies para mejorar tu experiencia. Puedes aceptar o rechazar las cookies analíticas.
                <a href="${cookiePath}" class="cookie-link">Más información</a>
            </p>
            <div class="cookie-buttons">
                <button id="aceptar-cookies" class="btn-cookie aceptar">Aceptar</button>
                <button id="rechazar-cookies" class="btn-cookie rechazar">Rechazar</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);

    // 🎉 Estilos rápidos (puedes moverlos a tu CSS si prefieres)
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
        background-color:rgb(26, 232, 88);
        color: white;
        }

        .btn-cookie.aceptar:hover {
        background-color:rgb(12, 215, 66);
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
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
  script.async = true;
  document.head.appendChild(script);

  script.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-XXXXXXXXXX");
  };
}
