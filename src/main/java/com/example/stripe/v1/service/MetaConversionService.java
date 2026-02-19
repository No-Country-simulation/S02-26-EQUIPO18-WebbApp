package com.example.stripe.v1.service;


import com.example.stripe.v1.dto.ConversionData;
import com.google.gson.Gson;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Slf4j
@Service
public class MetaConversionService {
    @Value("${meta.pixel.id}")
    private String pixelId;

    @Value("${meta.access.token}")
    private String accessToken;

    private final WebClient webClient;
    private final Gson gson;

    // https://developers.facebook.com/docs/graph-api/changelog
    public MetaConversionService() {
        System.out.println("========================================");
        System.out.println("MetaConversionsService CREADO");
        System.out.println("========================================");
        this.webClient = WebClient.builder()
                .baseUrl("https://graph.facebook.com/v21.0") // 21.0 Api version meta
                .build();
        this.gson = new Gson();
    }

    public void sendPurchaseEvent(ConversionData data) {
        try {
            //Construir el evento
            Map<String, Object> event = buildEvent(data);

            //Construir el payload completo
            Map<String, Object> payload = new HashMap<>();
            payload.put("data", List.of(event));
            payload.put("access_token", accessToken);

            String jsonPayload = gson.toJson(payload);

            log.info("========================================");
            log.info("Enviando conversión a Meta");
            log.info("Payload: {}", jsonPayload);
            log.info("========================================");

            // Enviar a Meta
            String response = webClient.post()
                    .uri("/{pixelId}/events", pixelId)
                    .header("Content-Type", "application/json")
                    .bodyValue(jsonPayload)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            log.info("Meta response: {}", response);

        } catch (Exception e) {
            log.error("Error enviando conversión a Meta: {}", e.getMessage(), e);
        }
    }

    private Map<String, Object> buildEvent(ConversionData data) {
        Map<String, Object> event = new HashMap<>();

        // Información básica del evento
        event.put("event_name", "Purchase");
        event.put("event_time", data.getEventTime());
        event.put("event_id", data.getEventId());
        event.put("action_source", "website");

        // User data (hasheado)
        Map<String, Object> userData = buildUserData(data);
        event.put("user_data", userData);

        // Custom data (valor de la compra)
        Map<String, Object> customData = new HashMap<>();
        customData.put("currency", data.getCurrency().toUpperCase());
        customData.put("value", data.getValue());
        event.put("custom_data", customData);

        return event;
    }

    //https:developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters#hashing
    private Map<String, Object> buildUserData(ConversionData data) {
        Map<String, Object> userData = new HashMap<>();

        // Email hasheado (si existe)
        if (data.getEmail() != null) {
            String normalizedEmail = data.getEmail().toLowerCase().trim();
            userData.put("em", hashSHA256(normalizedEmail));
            log.info("Email original: {} → Hash: {}",
                    data.getEmail(),
                    hashSHA256(normalizedEmail).substring(0, 10) + "...");
        } else {
            //SOLO PARA TESTING: Email ficticio cuando stripe trigger no provee uno-------------
            String testEmail = "test@example.com";
            userData.put("em", hashSHA256(testEmail));
            log.warn("No hay email real, usando email de prueba: {}", testEmail);
        }
//-----------------------------------------
        // Teléfono hasheado (si existe)
        if (data.getPhone() != null) {
            String normalizedPhone = data.getPhone().replaceAll("[^0-9]", "");
            userData.put("ph", hashSHA256(normalizedPhone));
        }

        // Nombre hasheado (si existe)
        if (data.getFirstName() != null) {
            userData.put("fn", hashSHA256(data.getFirstName().toLowerCase().trim()));
        }

        if (data.getLastName() != null) {
            userData.put("ln", hashSHA256(data.getLastName().toLowerCase().trim()));
        }

        // Cookies de tracking (SIN hashear)
        if (data.getFbc() != null) {
            userData.put("fbc", data.getFbc());
            log.info("fbc incluido: {}", data.getFbc());
        } else {
            log.warn("fbc NO está presente - El matching será menos preciso");
        }

        if (data.getFbp() != null) {
            userData.put("fbp", data.getFbp());
            log.info("fbp incluido: {}", data.getFbp());
        } else {
            log.warn("fbp NO está presente");
        }

        // Datos técnicos
        if (data.getUserAgent() != null) {
            userData.put("client_user_agent", data.getUserAgent());
        }

        if (data.getIpAddress() != null) {
            userData.put("client_ip_address", data.getIpAddress());
        }

        return userData;
    }

    private String hashSHA256(String input) {
        return DigestUtils.sha256Hex(input);
    }
}
