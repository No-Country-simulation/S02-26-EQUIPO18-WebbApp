package com.nocountry.ecommerce.infrastructure.adapter.output.marketing;

import com.google.gson.Gson;
import com.nocountry.ecommerce.domain.model.ConversionDataDTO;
import com.nocountry.ecommerce.domain.ports.out.MarketingPort;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
public class MetaAdapter implements MarketingPort {

    @Value("${meta.pixel.id}")
    private String pixelId;

    @Value("${meta.access.token}")
    private String accessToken;

    private final WebClient webClient;
    private final Gson gson;
    // https://developers.facebook.com/docs/graph-api/changelog

    public MetaAdapter() {
        log.info("========================================");
        log.info("Meta Adapter CREADO");
        log.info("========================================");
        this.webClient = WebClient.builder()
                .baseUrl("https://graph.facebook.com/v21.0") // 21.0 Api version meta
                .build();
        this.gson = new Gson();
    }

    @Override
    public void sendPurchaseEvent(ConversionDataDTO dataDTO) {
        log.info("Meta CAPI: Enviando evento de compra para {}", dataDTO.getEmail());
        try {
            //Constrimos el evento
            Map<String, Object> event = buiderEvent(dataDTO);
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
            webClient.post()
                    .uri("/{pixelId}/events", pixelId)
                    .header("Content-Type", "application/json")
                    .bodyValue(jsonPayload)
                    .retrieve()
                    .bodyToMono(String.class)
                    .doOnSuccess(resp -> log.info("Meta response: {}", resp))
                    .doOnError(resp -> log.info("Error Meta CAPI: {}", resp.getMessage()))
                    .subscribe();

            // .block(); // Remplazamos block por suscribe(), para poder pasar la respuesta de Meta a segundo plano

            // log.info("Meta response: {}", response);

        } catch (Exception e) {
            return;
        }

    }

    private Map<String, Object> buiderEvent(ConversionDataDTO dataDTO) {
        Map<String, Object> event = new HashMap<>();

        //Informacion basica del evento
        event.put("event_name", "Purchase");
        event.put("event_time", dataDTO.getEventTime());
        event.put("event_id", dataDTO.getEventId());
        event.put("action_source", "website");

        // User data (Haseado)
        Map<String, Object> userData = buildUserData(dataDTO);
        event.put("user_data", userData);

        // Custom data (valor de la compra)
        Map<String, Object> customData = new HashMap<>();
        customData.put("currency", dataDTO.getCurrency().toUpperCase());
        customData.put("value", dataDTO.getValue());
        event.put("custom_data", customData);

        return event;
    }

    private Map<String, Object> buildUserData(ConversionDataDTO dataDTO) {

        Map<String, Object> userData = new HashMap<>();

        // Email hasheado (si existe)
        if (dataDTO.getEmail() != null) {
            String normalizedEmail = dataDTO.getEmail().toLowerCase().trim();
            userData.put("em", hashSHA256(normalizedEmail));
            log.info("Email original: {} → Hash: {}",
                    dataDTO.getEmail(),
                    hashSHA256(normalizedEmail).substring(0, 10) + "...");
        } else {
// Email ficticio cuando stripe trigger no provee uno-------------
            String testEmail = "test@example.com";
            userData.put("em", hashSHA256(testEmail));
            log.warn("No hay email real, usando email de prueba: {}", testEmail);
        }
//-----------------------------------------
        // Teléfono hasheado (si existe)
        if (dataDTO.getPhone() != null) {
            String normalizedPhone = dataDTO.getPhone().replaceAll("[^0-9]", "");
            userData.put("ph", hashSHA256(normalizedPhone));
        }

        // Nombre hasheado (si existe)
        if (dataDTO.getFirstName() != null) {
            userData.put("fn", hashSHA256(dataDTO.getFirstName().toLowerCase().trim()));
        }

        if (dataDTO.getLastName() != null) {
            userData.put("ln", hashSHA256(dataDTO.getLastName().toLowerCase().trim()));
        }

        // Cookies de tracking (SIN hashear)
        if (dataDTO.getFbc() != null) {
            userData.put("fbc", dataDTO.getFbc());
            log.info("fbc incluido: {}", dataDTO.getFbc());
        } else {
            log.warn("fbc NO está presente - El matching será menos preciso");
        }

        if (dataDTO.getFbp() != null) {
            userData.put("fbp", dataDTO.getFbp());
            log.info("fbp incluido: {}", dataDTO.getFbp());
        } else {
            log.warn("fbp NO está presente");
        }

        // Datos técnicos
        if (dataDTO.getUserAgent() != null) {
            userData.put("client_user_agent", dataDTO.getUserAgent());
        }

        if (dataDTO.getIpAddress() != null) {
            userData.put("client_ip_address", dataDTO.getIpAddress());
        }

        return userData;

    }

    //Metodo para hashear
    private String hashSHA256(String input) {
        return DigestUtils.sha256Hex(input);
    }

}

