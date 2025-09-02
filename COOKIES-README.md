# Sistema de Cookies - Aznar Textil

## Descripción
Este sistema implementa un banner de cookies que cumple con la normativa GDPR y solo carga Google Analytics cuando el usuario acepta explícitamente las cookies.

## Archivos implementados

### 1. `assets/css/cookie-banner.css`
- Estilos del banner de cookies
- Posicionamiento fijo en la parte inferior
- Diseño responsive
- Asegura visibilidad completa del banner

### 2. `assets/js/analytics.js`
- Lógica del sistema de cookies
- Banner dinámico
- Carga condicional de Google Analytics
- Tracking de eventos solo si se aceptan cookies

### 3. `test-cookies.html`
- Página de prueba para verificar funcionamiento
- Botones para probar todas las funcionalidades

## Funcionalidades

### ✅ Banner de Cookies
- Aparece automáticamente en la primera visita
- Posicionado fijo en la parte inferior
- Visible en todas las pantallas
- No se corta ni se oculta

### ✅ Enlace a Política de Cookies
- Enlace directo a `/es/legal/uso-cookies.html`
- Se abre en nueva pestaña
- Texto claro y visible

### ✅ Funcionamiento Condicional
- **Al ACEPTAR**: Se cargan las cookies y Google Analytics
- **Al RECHAZAR**: No se cargan cookies ni analytics
- La decisión se guarda en localStorage
- Persiste entre sesiones

### ✅ Google Analytics
- Solo se carga si se aceptan las cookies
- Configuración segura con `anonymize_ip: true`
- Cookies seguras con `SameSite=None;Secure`
- Tracking de eventos completo

## Cómo usar

### 1. Incluir en páginas HTML
```html
<!-- CSS del banner -->
<link rel="stylesheet" href="assets/css/cookie-banner.css">

<!-- JavaScript del sistema -->
<script src="assets/js/analytics.js"></script>
```

### 2. Configurar Google Analytics
Editar `assets/js/analytics.js` y cambiar:
```javascript
const GA_MEASUREMENT_ID = 'G-TU-ID-REAL';
```

### 3. Personalizar estilos
Editar `assets/css/cookie-banner.css` para cambiar:
- Colores
- Tipografía
- Espaciado
- Posicionamiento

## Funciones disponibles

### `cambiarPreferenciasCookies()`
- Muestra el banner nuevamente
- Permite cambiar la decisión previa

### `getCookieStatus()`
- Retorna el estado actual de las cookies
- Incluye decisión y timestamp

## Cumplimiento GDPR

✅ **Consentimiento explícito**: Solo se cargan cookies si se aceptan
✅ **Información clara**: Banner con texto comprensible
✅ **Enlace a política**: Acceso directo a información detallada
✅ **Derecho de revocación**: Función para cambiar preferencias
✅ **No tracking sin consentimiento**: Analytics solo se activa tras aceptar

## Testing

1. Abrir `test-cookies.html` en el navegador
2. Verificar que el banner aparece
3. Probar botones Aceptar/Rechazar
4. Verificar que analytics solo se carga al aceptar
5. Probar función de cambio de preferencias

## Notas técnicas

- Usa `localStorage` para persistencia
- Z-index alto (99999) para asegurar visibilidad
- CSS con `!important` para evitar conflictos
- Funciones disponibles globalmente para debugging
- Compatible con todos los navegadores modernos
