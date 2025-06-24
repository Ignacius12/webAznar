<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 🌈 Carga de PHPMailer
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

// 🔐 Carga de credenciales protegidas
require 'config.php';

// 🛡️ Asegura que solo se accede por POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    exit("Acceso no permitido.");
}

try {
    // 🎯 Validación básica del mensaje
    $mensaje = trim($_POST["mensaje"] ?? '');
    if (empty($mensaje)) {
        http_response_code(400);
        exit("El mensaje es obligatorio.");
    }

    // 💌 Configuración del correo
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.office365.com';
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USER;
    $mail->Password = SMTP_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';

    // 📬 Envío desde un correo genérico
    $mail->setFrom(SMTP_USER, 'Canal de Denuncias');
    $mail->addAddress("ignacioya2002@gmail.com");
    $mail->Subject = "Nueva denuncia anónima desde el canal web";
    $mail->isHTML(false); // Enviamos texto plano
    $mail->Body = "Se ha recibido una denuncia anónima a través del formulario web:\n\n" . $mensaje;

    // 🚀 Envío
    $mail->send();

    // 🌟 Redirección tras éxito
    header("Location: ../es/gracias.html");
    exit;

} catch (Exception $e) {
    error_log("Error al enviar denuncia: " . $mail->ErrorInfo);
    http_response_code(500);
    echo "No se pudo enviar el mensaje. Inténtelo más tarde.";
}
