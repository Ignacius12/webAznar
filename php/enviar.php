<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 🌈 Carga segura de PHPMailer
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

// 💌 Cargamos configuración externa
require 'config.php';

// 🛡️ Evitamos el acceso por métodos distintos de POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    exit("⚠️ Acceso no permitido.");
}

try {
    // 💖 Creamos y configuramos el objeto PHPMailer
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.office365.com';
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USER; // protegido
    $mail->Password = SMTP_PASS; // protegido
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom(SMTP_USER, 'Contacto mediante formulario web');

    // 🎯 Validamos y limpiamos entradas
    $nombre    = htmlspecialchars(trim($_POST['nombre'] ?? ''));
    $email     = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $asunto    = htmlspecialchars(trim($_POST['asunto'] ?? ''));
    $mensaje   = htmlspecialchars(trim($_POST['mensaje'] ?? ''));
    $privacidad = isset($_POST['privacidad']);

    // ⛔ Verificación básica
    if (!$nombre || !$email || !$mensaje || !$privacidad) {
        exit("Por favor, completa todos los campos correctamente y acepta la política de privacidad.");
    }

    // 📫 Datos del destinatario
    $mail->addAddress("ignacioya2002@gmail.com");
    $mail->Subject = $asunto ?: 'Formulario sin asunto';
    $mail->isHTML(true);
    $mail->Body = "
        <h1>Datos del usuario</h1>
        <p><strong>Nombre:</strong> $nombre<br>
        <strong>Email:</strong> $email<br>
        <strong>Mensaje:</strong><br>$mensaje</p>
    ";

    // 🚀 Enviamos el correo
    $mail->send();

    // 🥳 Redirigimos a página de gracias
    header("Location: ../es/gracias.html");
    exit;

} catch (Exception $e) {
    // 🛠️ No mostramos errores al usuario, solo los registramos
    error_log("Error al enviar correo: " . $mail->ErrorInfo);
    echo "Ups, algo salió mal. Inténtalo más tarde 🥺";
}
?>
