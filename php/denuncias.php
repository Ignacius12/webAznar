<?php
// ⚠️ Importante: asegúrate de que tu servidor tenga habilitado mail() o utiliza una librería como PHPMailer para producción segura

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Recolectamos el mensaje del formulario
    $mensaje = trim($_POST["mensaje"]);

    // Validación básica
    if (empty($mensaje)) {
        http_response_code(400);
        echo "El mensaje es obligatorio.";
        exit;
    }

    // Datos del correo
    $to = "canaldedenuncias@aznartextil.com";
    $subject = "Nueva denuncia anónima desde el canal web";
    $headers = "From: anonimo@aznartextil.com\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    // Cuerpo del mensaje
    $body = "Se ha recibido una denuncia anónima a través del formulario web:\n\n";
    $body .= $mensaje . "\n";

    // Envío del correo
    if (mail($to, $subject, $body, $headers)) {
        // Redirección o confirmación
        header("Location: ../gracias.html"); // Asegúrate de tener esta página
        exit;
    } else {
        http_response_code(500);
        echo "No se pudo enviar el mensaje. Inténtelo más tarde.";
    }
} else {
    http_response_code(403);
    echo "Acceso no permitido.";
}
?>
