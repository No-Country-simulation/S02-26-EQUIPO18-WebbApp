package com.nocountry.ecommerce.infrastructure.adapter.output.marketing;

import com.nocountry.ecommerce.domain.model.Order;
import com.nocountry.ecommerce.domain.ports.out.EmailPort;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailAdapter implements EmailPort {

    private final JavaMailSender mailSender;

    @Override
    public void sendPurchaseConfirmation(String to, String subject, String amount, String currency) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("Confirmación de tu pedido - LLC Incorporation");

            // Cuerpo en HTML
            String htmlBody = """
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;'>
                    <h2 style='color: #2e7d32;'>¡Gracias por tu compra, %s!</h2>
                    <p>Hemos procesado con éxito tu pago para el servicio de <strong>Incorporación de LLC</strong>.</p>
                    <hr style='border: 0; border-top: 1px solid #eee;'>
                    <p><strong>Detalles de la transacción:</strong></p>
                    <ul>
                        <li><strong>Monto:</strong> %s %s</li>
                        <li><strong>Estado:</strong> Completado</li>
                    </ul>
                    <p>En breve recibirás un correo con los siguientes pasos para iniciar tu trámite.</p>
                    <br>
                    <p style='font-size: 12px; color: #777;'>Este es un correo automático, por favor no respondas a este mensaje.</p>
                </div>
                """.formatted(subject, amount, currency);

            helper.setText(htmlBody, true); // 'true' indica que es HTML

            mailSender.send(message);
            log.info("Correo de confirmación enviado a: {}", to);

        } catch (MessagingException e) {
            log.error("Error al construir el correo: {}", e.getMessage());
        }
    }

    @Override
    public void sendWelcomeEmail(String to, String customerName, Order order) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("Confirmación de Orden #" + order.getId() + " - LLC Incorporation");

            // Cuerpo HTML con todos los datos que mencionaste
            String htmlBody = """
                    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;'>
                        <h2 style='color: #1976d2;'>¡Hola, %s!</h2>
                        <p>Hemos recibido tu solicitud para registrar <strong>%s</strong>.</p>
                        
                        <div style='background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;'>
                            <h3 style='margin-top: 0;'>Detalles de tu Orden:</h3>
                            <p><strong>ID de Orden:</strong> #%d</p>
                            <p><strong>Total a pagar:</strong> $%s</p>
                            <p><strong>Estado:</strong> %s</p>
                        </div>

                        <div style='background-color: #e3f2fd; padding: 15px; border-radius: 5px; border-left: 5px solid #1976d2;'>
                            <p style='margin: 0;'><strong>Tus credenciales de acceso:</strong></p>
                            <p style='margin: 5px 0;'>Usuario: <em>%s</em></p>
                            <p style='margin: 5px 0;'>Contraseña Temporal: <strong>%s</strong></p>
                        </div>

                        <p style='margin-top: 25px;'>Si no completaste el pago en la ventana anterior, puedes hacerlo aquí:</p>
                        <div style='text-align: center; margin: 20px 0;'>
                            <a href='%s' style='background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;'>Completar Pago en Stripe</a>
                        </div>

                        <p style='font-size: 12px; color: #777;'>Por seguridad, te recomendamos cambiar tu contraseña al iniciar sesión por primera vez.</p>
                    </div>
                    """.formatted(
                    customerName,
                    order.getBusiness().getName(), // Nombre del negocio
                    order.getId(),
                    order.getPriceTotal().toString(),
                    order.getStatus(),
                    to, // Email del usuario
                    order.getGeneratedPassword(), // La contraseña que generamos
                    order.getUrlRecibo() // Link de respaldo por si se le cierra la pestaña
            );

            helper.setText(htmlBody, true);
            mailSender.send(message);
            log.info("Correo de confirmación enviado a: {}", to);

        } catch (MessagingException e) {
            log.error("Error al enviar el correo: {}", e.getMessage());
        }
    }
}
