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
                    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; color: #333;'>
                        <h2 style='color: #1a237e;'>¡Gracias por tu compra, %s!</h2>
                        <p>Hemos procesado con éxito tu pago para el servicio de <strong>Incorporación de LLC</strong>.</p>
                        
                        <hr style='border: 0; border-top: 1px solid #eee; margin: 20px 0;'>
                        
                        <p><strong>Detalles de la transacción:</strong></p>
                        <ul style='list-style: none; padding: 0;'>
                            <li><strong>Monto:</strong> %s %s</li>
                            <li><strong>Estado:</strong> <span style='color: #2e7d32;'>Completado</span></li>
                        </ul>

                        <div style='background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-top: 25px;'>
                            <h3 style='color: #1a237e; margin-top: 0;'>¿QUÉ SIGUE AHORA?</h3>
                            <ul style='line-height: 1.6;'>
                                <li>Formalizar tu solicitud con la firma digital del contrato.</li>
                                <li>Revisión legal del nombre de tu empresa.</li>
                                <li>Preparación de documentos para el estado.</li>
                                <li>Envío de Documentación pertinente de tu nueva empresa.</li>
                            </ul>
                        </div>

                        <div style='text-align: center; margin: 30px 0;'>
                            <a href='http://localhost:3000/dashboard' 
                               style='background-color: #1a237e; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;'>
                               Ir a mi Dashboard
                            </a>
                        </div>

                        <hr style='border: 0; border-top: 1px solid #eee; margin: 20px 0;'>
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
                    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px; color: #333;'>
                        <h2 style='color: #1a237e;'>¡Hola, %s!</h2>
                        <p>Hemos recibido tu solicitud para registrar <strong>%s</strong>.</p>
                        
                        <div style='background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;'>
                            <h3 style='margin-top: 0; color: #1a237e;'>Detalles de tu Orden:</h3>
                            <p><strong>ID de Orden:</strong> #%d</p>
                            <p><strong>Total a pagar:</strong> $%s</p>
                            <p><strong>Estado:</strong> %s</p>
                        </div>

                        <div style='background-color: #e3f2fd; padding: 15px; border-radius: 5px; border-left: 5px solid #1a237e;'>
                            <p style='margin: 0;'><strong>Tus credenciales de acceso:</strong></p>
                            <p style='margin: 5px 0;'>Usuario: <em>%s</em></p>
                            <p style='margin: 5px 0;'>Contraseña Temporal: <strong>%s</strong></p>
                        </div>

                        <div style='text-align: center; margin: 25px 0;'>
                            <a href='http://localhost:3000' 
                               style='background-color: #1a237e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;'>
                               Volver a la Página Principal
                            </a>
                        </div>

                        <hr style='border: 0; border-top: 1px solid #eee; margin: 25px 0;'>

                        <p>Si no completaste el pago en la ventana anterior, puedes hacerlo aquí:</p>
                        <div style='text-align: center; margin: 20px 0;'>
                            <a href='%s' style='background-color: #2e7d32; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;'>
                                Completar Pago en Stripe
                            </a>
                        </div>

                        <p style='font-size: 12px; color: #777; margin-top: 25px;'>Por seguridad, te recomendamos cambiar tu contraseña al iniciar sesión por primera vez.</p>
                    </div>
                    """.formatted(
                    customerName,
                    order.getBusiness().getName(),
                    order.getId(),
                    order.getPriceTotal().toString(),
                    order.getStatus(),
                    to,
                    order.getGeneratedPassword(),
                    order.getUrlRecibo()
            );

            helper.setText(htmlBody, true);
            mailSender.send(message);
            log.info("Correo de confirmación enviado a: {}", to);

        } catch (MessagingException e) {
            log.error("Error al enviar el correo: {}", e.getMessage());
        }
    }
}
