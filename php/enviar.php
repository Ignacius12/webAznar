<?php
// 💫 Verificamos que el formulario ha sido enviado por POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // 🧼 Recoger y limpiar los datos del formulario
    $nombre  = htmlspecialchars(trim($_POST['nombre'] ?? ''));
    $email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $asunto  = htmlspecialchars(trim($_POST['asunto'] ?? ''));
    $mensaje = htmlspecialchars(trim($_POST['mensaje'] ?? ''));
    $privacidad = isset($_POST['privacidad']);

    // ⚠️ Validación: todos los campos son obligatorios
    if (!$nombre || !$email || !$asunto || !$mensaje || !$privacidad) {
        echo "❌ Todos los campos son obligatorios y debes aceptar la Política de Privacidad.";
        exit;
    }

    // 📨 Configuración del correo
    $destinatario = "aznartextil@aznartextil.com";
    $asuntoEmail = "Nuevo mensaje desde el formulario web";

    // ✍️ Construcción del cuerpo del mensaje
    $contenido = "Has recibido un nuevo mensaje desde el formulario web:\n\n";
    $contenido .= "Nombre: $nombre\n";
    $contenido .= "Email: $email\n";
    $contenido .= "Asunto: $asunto\n\n";
    $contenido .= "Mensaje:\n$mensaje\n";

    // 📩 Cabeceras del email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // 🚀 Envío del correo
    if (mail($destinatario, $asuntoEmail, $contenido, $headers)) {
        header("Location: ../es/gracias.html");
        exit;
    } else {
        echo "❌ Error al enviar el mensaje. Por favor, inténtalo más tarde.";
    }

} else {
    echo "⚠️ Acceso no permitido por este método.";
}
?>
